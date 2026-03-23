# Deployment Guide - Cloudflare Pages

## Warum Cloudflare Pages?

✅ **Kein Cold Start** - Sofort verfügbar  
✅ **Globales CDN** - Extrem schnell weltweit  
✅ **Kostenlos** - Unlimited Bandbreite  
✅ **Auto SSL** - HTTPS inklusive  
✅ **Git Integration** - Auto-Deploy bei Push  

Perfekt für eine Bewerbungsseite!

---

## Setup (einmalig)

### Option 1: Cloudflare Dashboard (Empfohlen)

1. **Cloudflare Account erstellen**: [dash.cloudflare.com](https://dash.cloudflare.com)

2. **Neues Pages Project**:
   - `Workers & Pages` → `Create application` → `Pages` → `Connect to Git`
   - Repository auswählen: `andrehickmann/resumee`

3. **Build Settings konfigurieren**:
   ```
   Framework preset:     Vue
   Build command:        npm run build
   Build output dir:     dist
   Root directory:       /
   Node version:         22
   ```

4. **Environment Variables** (WICHTIG für Under Construction):
   - Gehe zu `Settings` → `Environment variables`
   - Füge hinzu:
     - Name: `VITE_UNDER_CONSTRUCTION`
     - Value: `true`
     - Environment: Production

5. **Deploy** → Fertig! 🎉

Deine Site ist live unter: `https://resumee-xxx.pages.dev`

**Wichtig:** Ohne die Environment Variable `VITE_UNDER_CONSTRUCTION=true` wird die normale Seite angezeigt statt der Under Construction Seite!

### Option 2: GitHub Actions (Automatisch)

Die Workflow-Datei ist bereits erstellt (`.github/workflows/cloudflare-pages.yml`).

**Secrets in GitHub hinzufügen**:

1. Gehe zu deinem GitHub Repo → `Settings` → `Secrets and variables` → `Actions`

2. Füge hinzu:
   - `CLOUDFLARE_API_TOKEN`:
     - Cloudflare Dashboard → My Profile → API Tokens → Create Token
     - Template: "Edit Cloudflare Workers"
     - Permissions: Account > Cloudflare Pages > Edit
   
   - `CLOUDFLARE_ACCOUNT_ID`:
     - Cloudflare Dashboard → Workers & Pages (rechte Sidebar)
     - Account ID kopieren

3. Push zum `master` Branch → Automatisches Deployment!

---

## Custom Domain einrichten

### Option A: Domain über Cloudflare (Empfohlen)
1. Domain zu Cloudflare transferieren (kostenlos)
2. Pages Project → `Custom domains` → Domain hinzufügen
3. DNS wird automatisch konfiguriert ✅

### Option B: Externe Domain
1. Pages Project → `Custom domains` → Domain hinzufügen
2. CNAME Record bei deinem Domain-Provider:
   ```
   www  →  resumee-xxx.pages.dev
   @    →  resumee-xxx.pages.dev (oder A Record)
   ```

**Deine Domain `www.hickmann-kuschnereit.de`:**
- Füge in Cloudflare Pages unter Custom Domains hinzu
- SSL wird automatisch ausgestellt

---

## Deployment Status

Nach jedem Push zum `master` Branch:
1. GitHub Actions startet automatisch
2. Build dauert ~1-2 Minuten
3. Deploy auf Cloudflare Pages
4. Live unter deiner Domain 🚀

---

## Monitoring & Rollback

- **Deployment History**: Cloudflare Dashboard → Dein Project → Deployments
- **Rollback**: Einfach auf früheres Deployment klicken → "Rollback"
- **Analytics**: Kostenlos im Dashboard verfügbar

---

## Troubleshooting

### Build schlägt fehl mit "command not found" oder ähnlichem

**Lösung:**
1. Stelle sicher, dass die Build-Konfiguration korrekt ist:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `22`

2. Falls der Build wegen TypeScript-Fehlern abbricht, überprüfe `package.json`:
   - `vite` muss in `devDependencies` sein
   - Alle Vue-Pakete müssen installiert sein

### Under Construction wird nicht angezeigt

**Ursache:** Die Environment Variable `VITE_UNDER_CONSTRUCTION` fehlt.

**Lösung:**
1. Cloudflare Dashboard → Dein Project
2. Settings → Environment variables
3. Production: `VITE_UNDER_CONSTRUCTION` = `true`
4. Redeploy (neuen Commit pushen oder "Retry deployment")

### Build ist erfolgreich, aber Seite zeigt 404

**Lösung:**
- Die `_redirects` Datei sollte im `public/` Ordner sein
- Nach dem Build sollte sie in `dist/_redirects` landen
- Inhalt: `/*    /index.html   200`

### Build dauert zu lange oder timeout

**Lösung:**
- Cloudflare Pages hat ein 20-Minuten Limit
- Dein Build sollte ~2 Minuten dauern
- Falls länger: Checke Dependencies oder Build-Prozess

---

## Kosten

**Free Tier** (mehr als genug für dich):
- Unlimited requests
- Unlimited bandwidth
- 500 builds/Monat
- 1 concurrent build

**Keine Kreditkarte nötig!**

---

## Troubleshooting

### Build schlägt fehl?
- Checke Node Version (muss 22 sein)
- `npm ci` statt `npm install` in CI/CD

### 404 bei Routes?
Vue Router läuft im `history` mode. Cloudflare Pages unterstützt das automatisch via `_redirects` oder `_headers`.

Falls nötig, erstelle `public/_redirects`:
```
/*    /index.html   200
```

---

## Nächste Schritte

1. ✅ Push diese Änderungen nach GitHub
2. ✅ Cloudflare Pages Project erstellen (Option 1 oder 2)
3. ✅ Domain verbinden
4. ✅ Fertig!

Bei Fragen: [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
