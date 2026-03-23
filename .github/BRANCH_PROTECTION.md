# Branch Protection Setup für GitHub

## 🎯 Ziel: Master Branch schützen

Direkte Pushes zu `master` verhindern - alle Änderungen müssen über Pull Requests laufen.

---

## 📋 Setup Schritte:

### 1. GitHub Repository öffnen

- Gehe zu: https://github.com/andrehickmann/resumee

### 2. Settings öffnen

- Klicke auf **Settings** (oben rechts im Repo)

### 3. Branch Protection Rules

- Linke Sidebar: **Branches** (unter "Code and automation")
- Klicke auf: **Add branch protection rule**

### 4. Branch Pattern

- **Branch name pattern:** `master`
- Oder auch: `main` falls du beide schützen willst

### 5. Empfohlene Einstellungen

#### ✅ Require a pull request before merging

- **Aktivieren** ✓
- Optional: "Require approvals" (1) - wenn du Self-Review machst
- Optional: "Dismiss stale pull request approvals when new commits are pushed"

#### ✅ Require status checks to pass before merging

- **Aktivieren** ✓
- **Require branches to be up to date before merging** ✓
- Wähle **Status check:** `lint-and-build` (Name deines CI Jobs)

#### ✅ Require conversation resolution before merging

- **Aktivieren** ✓ (alle Kommentare müssen resolved sein)

#### ✅ Do not allow bypassing the above settings

- **Aktivieren** ✓ (auch Admin = du muss sich dran halten!)

#### ❌ Allow force pushes (NICHT aktivieren!)

- Bleibt deaktiviert

#### ❌ Allow deletions (NICHT aktivieren!)

- Bleibt deaktiviert

### 6. Speichern

- Klicke unten: **Create** oder **Save changes**

---

## 🔄 Neuer Workflow nach Branch Protection:

### Alte Art (direkt auf master):

```bash
git add .
git commit -m "Fix something"
git push origin master  # ❌ ABGELEHNT!
```

### Neue Art (über Feature Branch):

```bash
# 1. Feature Branch erstellen
git checkout -b feature/my-feature

# 2. Änderungen machen
git add .
git commit -m "Add new feature"

# 3. Branch pushen
git push origin feature/my-feature

# 4. Pull Request auf GitHub erstellen
# → GitHub zeigt automatisch "Create Pull Request" Link

# 5. Warten auf CI (lint + build)
# → GitHub zeigt Status: ✅ Checks passed

# 6. Merge via GitHub UI
# → Klick auf "Merge pull request"

# 7. Zurück zu master und pullen
git checkout master
git pull origin master

# 8. Feature Branch löschen
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

---

## 🧪 Aktueller Test:

**Branch:** `test/ci-workflow`
**Status:** Gepusht ✅

**Check CI Status:**

1. Gehe zu: https://github.com/andrehickmann/resumee/actions
2. Du solltest den Workflow **"CI"** laufen sehen
3. Status: 🟡 Running → 🟢 Passed (hoffentlich!)

**Pull Request erstellen:**

1. Gehe zu: https://github.com/andrehickmann/resumee/pull/new/test/ci-workflow
2. Erstelle PR
3. Warte auf CI ✅
4. Merge (wenn alles grün ist)

---

## 💡 Vorteile von Branch Protection:

✅ **Kein versehentliches Pushen** direkt auf master
✅ **CI läuft immer** vor dem Merge
✅ **Code Review möglich** (auch Self-Review)
✅ **History bleibt sauber** (via Squash Merge)
✅ **Rollback einfacher** (PR kann reopened werden)

---

## ⚠️ Für Solo-Projekte:

Du kannst dich selbst als Approver setzen, aber es ist optional. Hauptsache:

- ✅ CI muss grün sein
- ✅ Kein direkter Push auf master

Das reicht für gute Code-Qualität!

---

## 🔧 Alternative: Rulesets (Neu in GitHub)

GitHub hat ein neues Feature: **Repository Rulesets** (noch Beta).

**Vorteile:**

- Modernere UI
- Mehr Optionen
- Kann mehrere Branches gleichzeitig schützen

**Wo:** Settings → Rules → Rulesets → New ruleset

Ist aber noch in Beta - Branch Protection Rules sind stabiler.

---

## 📝 Zusammenfassung:

1. **Jetzt:** CI Workflow läuft auf `test/ci-workflow`
2. **Check:** https://github.com/andrehickmann/resumee/actions
3. **Dann:** Branch Protection aktivieren (siehe oben)
4. **Test:** PR aus `test/ci-workflow` → `master` erstellen
5. **Merge:** Wenn CI grün ist
6. **Fertig:** Ab jetzt nur noch PRs! 🎉
