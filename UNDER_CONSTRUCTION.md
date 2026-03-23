# Under Construction Mode

## ⚠️ WICHTIG: Statische Builds

Da dies eine statische Site ist, werden Environment Variables **beim Build** ausgewertet, nicht zur Laufzeit!

## Aktivieren/Deaktivieren

### Methode 1: .env.production ändern (Empfohlen)

**Under Construction aktivieren:**
1. Ändere `.env.production`: `VITE_UNDER_CONSTRUCTION=true`
2. Commit und push
3. Cloudflare baut neu → Under Construction ist live

**Live schalten:**
1. Ändere `.env.production`: `VITE_UNDER_CONSTRUCTION=false`
2. Commit und push
3. Cloudflare baut neu → Volle Seite ist live

### Methode 2: Cloudflare Environment Variable überschreiben

⚠️ **Nur für temporäre Tests!** Diese Methode überschreibt die .env.production Datei.

1. Cloudflare Dashboard → Dein Project → Settings → Environment variables
2. Production Environment: `VITE_UNDER_CONSTRUCTION` = `true` oder `false`
3. Redeploy triggern

**WICHTIG:** Die Cloudflare Env Variable hat Vorrang vor `.env.production`!

### Methode 3: Branch-basiertes Deployment (Für Fortgeschrittene)

Erstelle einen `under-construction` Branch:
```bash
git checkout -b under-construction
# Ändere .env.production zu true
git commit -am "Enable under construction"
git push origin under-construction
```

In Cloudflare: Richte Preview Environment für den Branch ein.

## Aktueller Status

**`.env.production`**: `VITE_UNDER_CONSTRUCTION=false` → **Volle Seite wird gebaut**

## Lokal testen

```bash
# Under Construction anzeigen
VITE_UNDER_CONSTRUCTION=true npm run dev

# Normale Seite anzeigen  
npm run dev
```
