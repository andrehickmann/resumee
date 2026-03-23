# Under Construction Mode

## Aktivieren/Deaktivieren

Die Seite kann in einen "Under Construction" Modus versetzt werden.

### In der Produktion (Cloudflare Pages)

Setze die Environment Variable in Cloudflare Pages:

```
VITE_UNDER_CONSTRUCTION=true
```

**Schritte:**
1. Cloudflare Dashboard → Workers & Pages → Dein Project
2. Settings → Environment variables
3. Füge hinzu: `VITE_UNDER_CONSTRUCTION` = `true`
4. Redeploy triggern (neuer Commit oder manual trigger)

### Lokal testen

```bash
# Under Construction anzeigen
VITE_UNDER_CONSTRUCTION=true npm run dev

# Normale Seite anzeigen
npm run dev
```

### Live schalten

Um die Seite live zu schalten:

1. In Cloudflare Pages: Setze `VITE_UNDER_CONSTRUCTION=false` (oder lösche die Variable)
2. Oder ändere `.env.production` lokal auf `false` und pushe einen neuen Commit

Die `.env.production` Datei ist aktuell auf `true` gesetzt, sodass Production Builds standardmäßig die Under Construction Seite zeigen.
