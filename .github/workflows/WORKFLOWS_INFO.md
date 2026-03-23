# GitHub Actions Workflows

## Aktuelle Workflows

### ci.yml - Continuous Integration

**Zweck:** Prüft Code-Qualität bei PRs und Feature-Branches

**Wann läuft es:**

- Bei jedem Push auf Branches (außer master/main)
- Bei jedem Pull Request

**Was macht es:**

1. ✅ Node.js 24 Setup
2. ✅ Dependencies installieren (`npm ci`)
3. ✅ Linting (`npm run lint`)
4. ✅ Build testen (`npm run build`)

**Wichtig:** Läuft NICHT auf master/main, da Cloudflare Pages das übernimmt.

---

## Deployment

**Produktions-Deployment erfolgt automatisch durch Cloudflare Pages:**

1. Push zu `master` Branch
2. Cloudflare Pages erkennt Änderung automatisch
3. Führt `npm run build` aus
4. Deployed `dist/` nach Cloudflare Edge

**Kein GitHub Actions Workflow nötig!**

---

## CI/CD Flow

```
Feature Branch
    ↓
Push/PR → GitHub Actions CI (lint + build test)
    ↓
Merge to master
    ↓
Cloudflare Pages (automatic build + deploy)
    ↓
Live auf hickmann-kuschnereit.de
```

---

## Node.js Version

- **CI Workflow:** Node.js 24 (neueste Version)
- **Cloudflare Pages:** Node.js 18.x (kann im Dashboard geändert werden)
- **Local Dev:** Wie in package.json definiert

**Warum unterschiedlich?**

- CI sollte neueste Version nutzen für Tests
- Cloudflare Pages ist konservativer (stabiler)
- Beides funktioniert für dieses Projekt
