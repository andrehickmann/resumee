#!/usr/bin/env bash
#
# Bringt die Seite auf dem vServer auf einen bestimmten Stand.
#
#   ./scripts/deploy.sh            # aktueller master
#   ./scripts/deploy.sh v1.1.10    # ein Release
#
# Aufgerufen wird das Skript entweder per Hand nach einem SSH-Login oder vom
# Workflow .github/workflows/vserver-deploy.yml. Beide Wege laufen durch
# dieselben Schritte – es gibt nur einen Weg, auf dem die Seite sich aendert.
#
# Gebaut wird auf dem Server, wie bei den anderen Projekten auf dieser
# Maschine. Das Ergebnis liegt damit nicht als Abbild irgendwo, sondern
# entsteht aus dem Stand, der hier auch eingecheckt ist.

set -euo pipefail

REF="${1:-master}"
PROJECT="resumee"
COMPOSE_FILE="compose.prod.yaml"

# Immer im Projektverzeichnis arbeiten, egal von wo aufgerufen.
cd "$(dirname "$(readlink -f "$0")")/.."
ROOT="$(pwd)"

echo "==> Projekt: $ROOT"

if [ ! -f "$COMPOSE_FILE" ]; then
  echo "FEHLER: $COMPOSE_FILE fehlt in $ROOT." >&2
  exit 1
fi

if [ ! -f .env ]; then
  echo "FEHLER: .env fehlt. Vorlage: .env.vserver.example" >&2
  exit 1
fi

# Der Stand von vorher, fuer den Rueckweg am Ende der Ausgabe.
PREVIOUS="$(git rev-parse --short HEAD 2>/dev/null || echo unbekannt)"

echo "==> Stand holen: $REF"
git fetch --prune --tags origin

# Ein Tag oder ein Commit wird direkt genommen, ein Zweigname ueber origin.
# Ohne diese Unterscheidung landet man auf einem veralteten lokalen Zweig.
if git rev-parse -q --verify "refs/tags/$REF" >/dev/null; then
  TARGET="refs/tags/$REF"
elif git rev-parse -q --verify "refs/remotes/origin/$REF" >/dev/null; then
  TARGET="refs/remotes/origin/$REF"
elif git cat-file -e "${REF}^{commit}" 2>/dev/null; then
  TARGET="$REF"
else
  echo "FEHLER: '$REF' ist weder Tag, Zweig noch Commit." >&2
  exit 1
fi

git checkout --detach --force "$TARGET"
git clean -fd
echo "==> Jetzt auf: $(git rev-parse --short HEAD) ($REF)"

echo "==> Abbild bauen"
docker compose -p "$PROJECT" -f "$COMPOSE_FILE" build --pull

echo "==> Container austauschen"
docker compose -p "$PROJECT" -f "$COMPOSE_FILE" up -d

# Erst melden, wenn nginx auch antwortet. Ohne diese Schleife gilt ein Deploy
# als erfolgreich, sobald der Container gestartet ist – auch wenn er
# unmittelbar danach wieder aussteigt.
CONTAINER="$(docker compose -p "$PROJECT" -f "$COMPOSE_FILE" ps -q web)"
echo "==> Auf Gesundmeldung warten"
for i in $(seq 1 30); do
  STATUS="$(docker inspect --format '{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo none)"
  case "$STATUS" in
    healthy)
      echo "    healthy nach ${i}0s"
      break
      ;;
    unhealthy)
      echo "FEHLER: Container meldet unhealthy." >&2
      docker logs --tail 50 "$CONTAINER" >&2
      exit 1
      ;;
  esac
  if [ "$i" -eq 30 ]; then
    echo "FEHLER: keine Gesundmeldung nach 300s." >&2
    docker logs --tail 50 "$CONTAINER" >&2
    exit 1
  fi
  sleep 10
done

# Die Abbilder der Vorgaenger sammeln sich sonst an; nach ein paar Releases
# sind das Gigabytes.
echo "==> Alte Abbilder wegraeumen"
docker image prune -f >/dev/null

echo
echo "==> Fertig. Vorher: $PREVIOUS – zurueck damit per:"
echo "    ./scripts/deploy.sh $PREVIOUS"
