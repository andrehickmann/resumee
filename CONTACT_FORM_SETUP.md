# Kontaktformular Setup

Das Kontaktformular nutzt **Cloudflare Pages Functions** und die **Resend API** für E-Mail-Versand.

## Setup-Schritte:

### 1. Resend API Key erhalten

1. Gehe zu [resend.com](https://resend.com/) und erstelle einen kostenlosen Account
2. Verifiziere deine E-Mail-Adresse
3. Erstelle einen API Key im Dashboard
4. **Kostenlos:** 100 E-Mails/Tag, 3.000 E-Mails/Monat

### 2. API Key in Cloudflare Pages hinzufügen

1. Gehe zu **Cloudflare Dashboard** → **Workers & Pages**
2. Wähle dein **resumee** Projekt
3. Gehe zu **Settings** → **Environment Variables**
4. Füge hinzu:
   - **Variable Name:** `RESEND_API_KEY`
   - **Value:** Dein Resend API Key
   - **Environment:** Production (und optional Preview)
5. Klicke **Save**

### 3. Deployment

Das Formular funktioniert automatisch nach dem nächsten Deploy:
```bash
git push origin master
```

## Features:

✅ **Echte E-Mail-Zustellung** - Nachrichten kommen direkt bei dir an  
✅ **Spam-Schutz** - Honeypot-Feld fängt Bots ab  
✅ **Validierung** - Server- und Client-seitig  
✅ **Success/Error Feedback** - Nutzer sehen Status der Anfrage  
✅ **Responsive Design** - Funktioniert auf allen Geräten  
✅ **DSGVO-konform** - Keine unnötigen Daten gespeichert  

## E-Mail-Template:

Empfänger: `andre@hickmann-kuschnereit.de`  
Subject: `Neue Kontaktanfrage von [Name]`  
Reply-To: E-Mail des Absenders (direkt antworten möglich)

## Lokale Entwicklung:

Das Formular funktioniert nur auf Cloudflare Pages, nicht lokal. Für lokales Testen:

```bash
npm run preview
```

Dies startet Wrangler Dev-Server mit Pages Functions Support.

## Später: Custom Domain für E-Mails

Aktuell: `onboarding@resend.dev` (Resend Standard)  
Später kannst du deine Domain verifizieren und E-Mails von `noreply@hickmann-kuschnereit.de` senden.

1. Gehe zu Resend Dashboard → Domains
2. Füge `hickmann-kuschnereit.de` hinzu
3. Füge die DNS Records in Cloudflare hinzu
4. Update `from:` in `functions/api/contact.ts`
