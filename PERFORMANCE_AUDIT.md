# Performance Audit Guide

## 🎯 Ziel

Messe und optimiere die Performance deiner Portfolio-Website für:
- ✅ Schnellere Ladezeiten
- ✅ Bessere User Experience
- ✅ Höheres SEO-Ranking
- ✅ Mobile Performance

---

## 📊 1. Google Lighthouse (Einfachste Methode)

### Option A: Chrome DevTools (Lokal)

**Vorbereitung:**
```bash
# Production Build erstellen
npm run build

# Preview starten
npm run preview
```

**Dann:**
1. Öffne Chrome/Edge
2. Gehe zu http://localhost:4173
3. **F12** → **Lighthouse** Tab
4. Wähle:
   - ✅ Performance
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
   - Device: **Mobile** (wichtiger!)
5. **"Analyze page load"** klicken

**Erwartete Scores:**
- 🟢 Performance: 90-100
- 🟢 Accessibility: 90-100
- 🟢 Best Practices: 90-100
- 🟢 SEO: 90-100

### Option B: PageSpeed Insights (Live Site)

**URL:** https://pagespeed.web.dev/

1. Gehe zu PageSpeed Insights
2. Eingabe: `https://hickmann-kuschnereit.de`
3. **Analyze** klicken
4. Warte ~30 Sekunden

**Vorteile:**
- ✅ Testet die echte Live-Site
- ✅ Real User Metrics (CrUX Data)
- ✅ Mobile + Desktop
- ✅ Keine lokale Setup nötig

---

## 📈 2. Web Vitals (Google's Core Metrics)

### Was gemessen wird:

| Metric | Name | Ziel | Beschreibung |
|--------|------|------|--------------|
| **LCP** | Largest Contentful Paint | < 2.5s | Wann der Hauptinhalt geladen ist |
| **FID** | First Input Delay | < 100ms | Wie schnell die Seite reagiert |
| **CLS** | Cumulative Layout Shift | < 0.1 | Layout-Stabilität beim Laden |
| **FCP** | First Contentful Paint | < 1.8s | Wann erstes Element erscheint |
| **TTI** | Time to Interactive | < 3.8s | Wann Seite interaktiv ist |

### Browser Extension installieren:

**Chrome Web Store:**
- "Web Vitals" Extension suchen
- Installieren
- Website besuchen
- Extension zeigt Live-Metriken

---

## 🛠️ 3. Lighthouse CI (Automatisiert)

### Setup für GitHub Actions:

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI

on:
  pull_request:
  push:
    branches: [master]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '24'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

**Konfiguration:** `lighthouserc.js`
```javascript
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }]
      }
    }
  }
};
```

---

## 🔍 4. WebPageTest (Detailliert)

**URL:** https://www.webpagetest.org/

1. Gehe zu WebPageTest
2. Eingabe: `https://hickmann-kuschnereit.de`
3. Settings:
   - Location: **Frankfurt, Germany** (näher zu Cloudflare Edge)
   - Browser: **Chrome**
   - Connection: **4G** (realistisch)
4. **Start Test**

**Zeigt:**
- ✅ Waterfall Chart (Resource Loading)
- ✅ Filmstrip View (Visual Loading)
- ✅ Request Details
- ✅ Content Breakdown

---

## 📱 5. Real User Monitoring (Optional)

### Option A: Google Analytics 4 + Web Vitals

**Setup:**
```bash
npm install web-vitals
```

**In `src/main.ts`:**
```typescript
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Google Analytics 4
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  });
}

// Measure Web Vitals
onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

### Option B: Cloudflare Web Analytics (Empfohlen!)

**Warum besser:**
- ✅ Privacy-friendly (kein Tracking)
- ✅ Kostenlos
- ✅ Integriert mit Cloudflare Pages
- ✅ Zeigt Core Web Vitals

**Setup:**
1. Cloudflare Dashboard → Web Analytics
2. "Add a site" → hickmann-kuschnereit.de
3. Kopiere JS Snippet
4. Füge zu `index.html` hinzu:
```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' 
        data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

---

## 🎯 Quick Audit Checklist

### Performance Optimierungen:

**Bilder:**
- [ ] Alle Bilder optimiert? (WebP, komprimiert)
- [ ] Lazy Loading für Bilder unter Fold?
- [ ] Richtige Bildgrößen? (srcset, sizes)

**JavaScript:**
- [ ] Code-Splitting aktiviert? (Vite macht das automatisch ✅)
- [ ] Unused Code entfernt?
- [ ] Tree-shaking funktioniert? (Vite macht das ✅)

**CSS:**
- [ ] Unused CSS entfernt?
- [ ] Critical CSS inline?
- [ ] Non-critical CSS async laden?

**Fonts:**
- [ ] Fonts preloaded?
- [ ] Font-display: swap?
- [ ] Subset fonts? (nur benötigte Zeichen)

**Caching:**
- [ ] Static Assets gecached? (Cloudflare macht das ✅)
- [ ] Service Worker? (optional für PWA)

---

## 📊 Schneller Audit Workflow

### 1. Baseline Messung (5 Min)

```bash
# Terminal 1: Build & Preview
npm run build && npm run preview

# Terminal 2: Lighthouse lokal
npx lighthouse http://localhost:4173 --view
```

### 2. Live Site Check (2 Min)

```bash
# PageSpeed Insights
open "https://pagespeed.web.dev/analysis?url=https://hickmann-kuschnereit.de"
```

### 3. Ergebnis analysieren

**Typische Probleme:**
1. 🔴 **Bilder zu groß** → Optimieren mit ImageOptim, Squoosh
2. 🔴 **Render-blocking Resources** → Async/Defer Scripts
3. 🔴 **Layout Shifts** → Width/Height auf Images setzen
4. 🔴 **Slow Server Response** → Cloudflare Edge sollte schnell sein ✅

---

## 🏆 Dein Performance Score

### Aktueller Status (geschätzt):

Deine Site sollte **sehr gut** performen, weil:
- ✅ Vite Build (optimiert automatisch)
- ✅ Cloudflare Pages (Edge Deployment)
- ✅ Vue 3 (klein & schnell)
- ✅ Code-Splitting aktiviert
- ✅ Tree-Shaking aktiviert
- ✅ Minification aktiviert

**Erwartete Scores:**
- Performance: 85-95
- Accessibility: 90-100
- Best Practices: 90-100
- SEO: 95-100

---

## 🔧 Häufige Optimierungen

### 1. Portrait.jpg optimieren

```bash
# Mit ImageMagick (falls installiert)
convert public/portrait.jpg -quality 85 -resize 800x800 public/portrait-optimized.jpg

# Oder online: https://squoosh.app
```

### 2. Fonts preloaden

**In `index.html`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap">
```

### 3. Critical CSS inline

```bash
# Mit critical package
npm install -D critical

# In package.json
"optimize": "critical dist/index.html --inline --base dist > dist/index-critical.html"
```

---

## 📝 Audit Report Template

Nach dem Audit, dokumentiere die Ergebnisse:

```markdown
# Performance Audit - [Datum]

## Lighthouse Scores
- Performance: XX/100
- Accessibility: XX/100
- Best Practices: XX/100
- SEO: XX/100

## Web Vitals
- LCP: X.Xs
- FID: XXms
- CLS: X.XX

## Probleme
1. [Problem] - [Schweregrad] - [Lösung]

## Optimierungen
- [ ] [Optimierung 1]
- [ ] [Optimierung 2]

## Ergebnis nach Optimierung
- Performance: XX → XX (+X)
```

---

## 🚀 Empfohlener Workflow

**Für jetzt (Launch):**
1. ✅ PageSpeed Insights Check (2 Min)
2. ✅ Lighthouse in Chrome DevTools (5 Min)
3. ✅ Screenshot der Scores für CV/Portfolio

**Für später (Continuous):**
1. Cloudflare Web Analytics aktivieren
2. Lighthouse CI in GitHub Actions
3. Monatlicher Performance Check

---

## 🎯 Tools Übersicht

| Tool | Zweck | Wann nutzen |
|------|-------|-------------|
| **PageSpeed Insights** | Schneller Check | Launch, Regular Audits |
| **Chrome DevTools Lighthouse** | Lokal testen | Development, Pre-Deploy |
| **WebPageTest** | Detaillierte Analyse | Debugging Performance Issues |
| **Lighthouse CI** | Automatisiert | CI/CD Pipeline |
| **Web Vitals Extension** | Real-time Monitoring | Development |
| **Cloudflare Analytics** | Production Monitoring | Always-on |

---

## ✅ Quick Start (JETZT!)

**Einfachster Weg (2 Minuten):**

1. Gehe zu: https://pagespeed.web.dev/
2. Eingabe: `https://hickmann-kuschnereit.de`
3. Click "Analyze"
4. Screenshot der Scores machen
5. Fertig! 🎉

**Scores > 90?** → Perfekt für Launch! ✅  
**Scores < 90?** → Optimierungen aus diesem Guide umsetzen

---

**Performance ist wichtig, aber nicht kritisch für Launch!**  
Erst launchen, dann optimieren! 🚀
