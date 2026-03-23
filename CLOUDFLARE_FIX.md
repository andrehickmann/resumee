# 🚨 Cloudflare Pages - Domain-Probleme lösen

## Problem 1: "This domain is already in use"

### Fehlermeldung
```
This domain is already in use. Please delete the corresponding 
record in DNS settings or enter another domain and try again.
```

### Ursache
Du hast die Domain bereits als **Zone** zu Cloudflare hinzugefügt. Cloudflare hat die **alten DNS-Records von domain-offensive übernommen** (A-Records auf `89.116.29.208`), die jetzt mit Cloudflare Pages kollidieren.

### Lösung (5 Minuten)

#### Schritt 1: Cloudflare DNS öffnen
1. https://dash.cloudflare.com → **Websites**
2. Klicke auf **hickmann-kuschnereit.de**
3. **DNS** → **Records** (linke Sidebar)

#### Schritt 2: Alte Website-Records löschen

**❌ LÖSCHE diese Records:**
- A Record `@` (oder hickmann-kuschnereit.de) → `89.116.29.208`
- A Record `www` → `89.116.29.208`
- AAAA Record `@` → `2a02:c206:3013:0101::1`
- AAAA Record `www` → `2a02:c206:3013:0101::1`

**✅ BEHALTE diese Records:**
- MX Record (E-Mail!)
- A Record `mail` → `89.116.29.208` (E-Mail!)
- Alle anderen E-Mail-bezogenen Records

#### Schritt 3: Domain zu Pages hinzufügen
1. **Workers & Pages** → **resumee**
2. **Custom domains** → **Set up a custom domain**
3. Gib ein: `hickmann-kuschnereit.de`
4. **Continue** → ✅ Funktioniert jetzt!
5. Wiederhole für `www.hickmann-kuschnereit.de`

Cloudflare Pages erstellt automatisch CNAME-Records zu `.pages.dev`

---

## Problem 2: Under Construction Seite ausschalten

### Schritt 1: Cloudflare Dashboard öffnen
1. Gehe zu: **https://dash.cloudflare.com**
2. Klicke auf **Workers & Pages**
3. Wähle dein Project **"resumee"**

### Schritt 2: Environment Variable prüfen
1. Klicke auf **Settings** (linke Sidebar)
2. Scrolle zu **Environment variables**
3. Wähle den **Production** Tab

### Schritt 3: Variable löschen oder ändern

**Option A: Variable löschen (Empfohlen)**
- Suche nach `VITE_UNDER_CONSTRUCTION`
- Klicke auf das **Mülleimer-Icon** (🗑️) rechts
- Bestätige mit **Delete**

**Option B: Variable auf false setzen**
- Suche nach `VITE_UNDER_CONSTRUCTION`
- Klicke auf **Edit** (Stift-Icon)
- Ändere den Wert zu: `false`
- Klicke **Save**

### Schritt 4: Neu deployen
1. Klicke auf **Deployments** (linke Sidebar)
2. Finde das letzte Deployment (oberster Eintrag)
3. Klicke auf die **drei Punkte** (⋮) rechts
4. Wähle **Retry deployment**
5. Warte ~2 Minuten

### Schritt 5: Prüfen
- Öffne deine Website
- Hard-Refresh: `Cmd + Shift + R` (Mac) oder `Ctrl + Shift + R` (Windows)
- Jetzt sollte die volle Portfolio-Seite erscheinen! 🎉

---

## Für die Zukunft

**Under Construction aktivieren:**
- Ändere `.env.production` zu `true`
- Commit + Push → Automatisches Deployment

**Live schalten:**
- Ändere `.env.production` zu `false`
- Commit + Push → Automatisches Deployment

⚠️ **WICHTIG:** Nutze NICHT die Cloudflare Environment Variable, sondern nur `.env.production` im Code!
