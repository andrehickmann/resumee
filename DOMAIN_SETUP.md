# Domain Setup: hickmann-kuschnereit.de mit Cloudflare Pages

## Option 1: Cloudflare DNS nutzen (Empfohlen) ⭐

**Vorteile:**
- Kostenlos
- Schnellere DNS-Auflösung
- Automatisches SSL
- Bessere DDoS-Schutz
- Einfachere Verwaltung

**Domain bleibt bei domain-offensive**, nur die Nameserver werden geändert!

### Schritt-für-Schritt Anleitung:

#### 1. Domain zu Cloudflare hinzufügen

1. **Cloudflare Dashboard**: https://dash.cloudflare.com
2. Klicke **"Add a site"**
3. Gib ein: `hickmann-kuschnereit.de`
4. Wähle den **Free Plan**
5. Klicke **Continue**

#### 2. DNS Records prüfen

Cloudflare scannt automatisch deine bestehenden DNS-Records von domain-offensive.

- Überprüfe, ob wichtige Records erkannt wurden
- Falls etwas fehlt, kannst du es später manuell hinzufügen

#### 3. Nameserver bei domain-offensive ändern

Cloudflare zeigt dir zwei Nameserver, z.B.:
```
alexa.ns.cloudflare.com
brad.ns.cloudflare.com
```

**Bei domain-offensive:**
1. Login: https://www.do.de/login
2. Gehe zu **Domain-Verwaltung**
3. Wähle `hickmann-kuschnereit.de`
4. Suche **"Nameserver"** oder **"DNS-Verwaltung"**
5. Ändere auf die **Cloudflare Nameserver** (beide!)
6. Speichern

⏱️ **Wartezeit:** 2-48 Stunden (meist innerhalb von 2 Stunden aktiv)

#### 4. Domain zu Cloudflare Pages hinzufügen

Sobald Cloudflare die Domain verifiziert hat:

1. **Cloudflare Dashboard** → **Workers & Pages**
2. Wähle dein Project **"resumee"**
3. Klicke **"Custom domains"**
4. Klicke **"Set up a custom domain"**
5. Gib ein:
   - `hickmann-kuschnereit.de` (Hauptdomain)
   - `www.hickmann-kuschnereit.de` (mit www)
6. Klicke **Continue**

Cloudflare erstellt automatisch:
- DNS Records (CNAME)
- SSL Zertifikat
- HTTP → HTTPS Redirect

✅ **Fertig!** Domain ist in ~10 Minuten bereit.

---

## Option 2: DNS bei domain-offensive lassen

**Nachteile:**
- Langsamerer DNS
- Keine Cloudflare-Features
- Manuelles SSL-Setup nötig

### Schritte:

#### 1. Cloudflare Pages Domain Setup

1. **Cloudflare Dashboard** → **Workers & Pages** → **resumee**
2. **Custom domains** → **Set up a custom domain**
3. Gib ein: `hickmann-kuschnereit.de` und `www.hickmann-kuschnereit.de`

Cloudflare zeigt dir die DNS-Records, die du setzen musst.

#### 2. DNS Records bei domain-offensive setzen

Login bei domain-offensive und füge hinzu:

**Für die Hauptdomain:**
```
Type: CNAME
Host: @
Value: resumee-xxx.pages.dev
TTL: 3600
```

**Für www:**
```
Type: CNAME
Host: www
Value: resumee-xxx.pages.dev
TTL: 3600
```

⚠️ **Problem:** Manche Provider erlauben kein CNAME auf Root-Domain (`@`). Dann:

```
Type: A
Host: @
Value: [IP-Adressen von Cloudflare]
```

Du findest die IPs in Cloudflare Pages unter Custom Domains.

---

## ⭐ Meine Empfehlung: Option 1

**Warum?**
- Einfacher Setup
- Bessere Performance
- Automatisches SSL
- Domain bleibt bei domain-offensive (wird NICHT übertragen!)
- Jederzeit rückgängig (einfach Nameserver zurückändern)

---

## Nach dem Setup testen

```bash
# DNS prüfen
dig hickmann-kuschnereit.de
dig www.hickmann-kuschnereit.de

# Im Browser
https://hickmann-kuschnereit.de
https://www.hickmann-kuschnereit.de
```

Beide sollten auf deine Cloudflare Pages Site zeigen!

---

## Troubleshooting

### "DNS record not found"
→ Nameserver-Änderung dauert noch (bis zu 48h)
→ Mit `dig hickmann-kuschnereit.de NS` prüfen

### "SSL-Fehler"
→ SSL-Zertifikat wird erstellt (~10-15 Min nach Domain-Aktivierung)
→ Geduld haben, kommt automatisch

### "404 Not Found"
→ DNS zeigt auf Cloudflare, aber Custom Domain nicht in Pages eingerichtet
→ Custom Domain in Cloudflare Pages hinzufügen

---

## Wichtig zu wissen

- ✅ Domain bleibt bei domain-offensive registriert
- ✅ Du zahlst weiter an domain-offensive (Registrierung)
- ✅ Cloudflare DNS ist kostenlos
- ✅ Jederzeit rückgängig machbar
- ✅ Keine Kündigung bei domain-offensive nötig
