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

**Produktions-Deployment erfolgt über GitHub Releases:**

1. Release in GitHub veröffentlichen
2. `release-deploy.yml` baut die App
3. `npm run deploy` lädt zu Cloudflare hoch
4. Live auf hickmann-kuschnereit.de

**Wichtig:** Cloudflare Pages Auto-Deploy im Dashboard deaktivieren.

---

## Preview Deployments (Pull Requests)

**Jeder Pull Request** erzeugt ein Preview-Deployment:

`https://resumee-pr-<PR_NUMBER>.workers.dev`

Der Workflow kommentiert die URL direkt im PR.

---

## CI/CD Flow

```
Feature Branch
    ↓
Push/PR → GitHub Actions CI (lint + build test)
    ↓
Merge to master
    ↓
Release erstellen
    ↓
GitHub Actions Release Deploy
    ↓
Live auf hickmann-kuschnereit.de
```

---

## Node.js Version

- **CI Workflow:** Node.js 24 (neueste Version)
- **Release Deploy:** Node.js 20.x (GitHub Actions)
- **Local Dev:** Wie in package.json definiert

**Warum unterschiedlich?**

- CI sollte neueste Version nutzen für Tests
- Release Deploy läuft in GitHub Actions
- Beides funktioniert für dieses Projekt
