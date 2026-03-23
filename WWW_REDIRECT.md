# WWW zu Non-WWW Redirect einrichten

## Problem
Cloudflare Pages leitet **nicht automatisch** von www auf non-www um. Beide Domains zeigen die gleiche Seite, aber die URL ändert sich nicht.

## Lösung: Redirect Rule erstellen (2 Minuten)

### Schritt 1: Redirect Rules öffnen

1. **Cloudflare Dashboard**: https://dash.cloudflare.com
2. **Websites** → Klicke auf **hickmann-kuschnereit.de**
3. Linke Sidebar → **Rules** → **Redirect Rules**
4. Klicke **"Create rule"**

### Schritt 2: Redirect Rule konfigurieren

**Rule Name:**
```
Redirect www to apex
```

**When incoming requests match:**
```
Field: Hostname
Operator: equals
Value: www.hickmann-kuschnereit.de
```

**Then:**
```
Type: Dynamic
Expression: concat("https://hickmann-kuschnereit.de", http.request.uri.path)
Status code: 301 - Permanent Redirect
```

### Schritt 3: Speichern

Klicke **"Deploy"** → Fertig! ✅

---

## Einfachere Alternative (für Anfänger)

Falls "Dynamic" kompliziert aussieht, nutze diese Variante:

**Then:**
```
Type: Static
URL: https://hickmann-kuschnereit.de
Status code: 301
Preserve query string: ✅ (angehakt)
```

⚠️ **Nachteil:** Leitet immer auf die Startseite um, nicht auf spezifische Unterseiten (z.B. /legal)

---

## Was passiert jetzt?

**Vorher:**
```
www.hickmann-kuschnereit.de → Zeigt Seite (URL bleibt www)
hickmann-kuschnereit.de → Zeigt Seite
```

**Nachher:**
```
www.hickmann-kuschnereit.de → Redirect → hickmann-kuschnereit.de ✅
hickmann-kuschnereit.de → Zeigt Seite
```

---

## Testen

```bash
# Im Browser
https://www.hickmann-kuschnereit.de

# Sollte automatisch umleiten auf:
https://hickmann-kuschnereit.de

# Terminal (optional)
curl -I https://www.hickmann-kuschnereit.de
# Sollte zeigen: "301 Moved Permanently"
```

---

## Warum 301 (Permanent)?

- **301** = Permanent Redirect
  - Suchmaschinen wissen: "Das ist die finale URL"
  - Browser cachen den Redirect
  - Besser für SEO

- **302** = Temporary Redirect
  - Nur für temporäre Weiterleitungen

Für www → non-www **immer 301** verwenden!

---

## Alternative: Non-WWW zu WWW

Falls du doch lieber www haben willst (nicht empfohlen):

**When incoming requests match:**
```
Field: Hostname
Operator: equals
Value: hickmann-kuschnereit.de
```

**Then:**
```
Type: Dynamic
Expression: concat("https://www.hickmann-kuschnereit.de", http.request.uri.path)
Status code: 301
```

---

## Kostet das extra?

❌ **Nein!** Redirect Rules sind im Free Plan enthalten:
- Bis zu 10 Rules kostenlos
- Unlimited Redirects

---

## Troubleshooting

### "Die Seite lädt einfach weiter"
→ Cache leeren: `Cmd + Shift + R` (Mac) oder `Ctrl + Shift + R` (Windows)

### "Funktioniert nicht"
→ DNS-Propagation dauert noch (bis zu 5 Minuten)
→ Prüfe, ob beide Domains SSL haben (grünes Schloss)

### "Redirect Loop"
→ Prüfe, ob die Rule nur für www gilt, nicht für non-www!
→ Field muss **exakt** "www.hickmann-kuschnereit.de" sein
