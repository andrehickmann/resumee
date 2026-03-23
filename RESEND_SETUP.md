# Resend API Key Setup für Cloudflare Pages

## Problem:
Du siehst die Meldung "Variables cannot be added to a Worker that only has static assets" 
weil du versuchst, Environment Variables im **Workers** Tab hinzuzufügen.

## Lösung:
Für **Cloudflare Pages** (nicht Workers!) musst du einen anderen Weg gehen:

### Schritt-für-Schritt Anleitung:

#### 1. Cloudflare Dashboard öffnen
- Gehe zu https://dash.cloudflare.com/
- Wähle dein Account

#### 2. Zu Pages navigieren
- Klicke auf **"Workers & Pages"** in der Sidebar
- Wähle dein **"resumee"** Projekt

#### 3. Settings Tab öffnen
- Klicke auf den **"Settings"** Tab (nicht Deployments!)

#### 4. Environment Variables finden
- Scrolle runter zu **"Environment variables"** Sektion
- NICHT "Variables and Secrets" (das ist für Workers)

#### 5. Variable hinzufügen
- Klicke auf **"Add variable"** oder **"Edit variables"**
- **Variable name:** `RESEND_API_KEY`
- **Value:** [Dein Resend API Key von resend.com]
- **Environment:** Production (checkbox ankreuzen)
- Optional: Preview auch ankreuzen wenn du willst

#### 6. Speichern
- Klicke **"Save"**
- Cloudflare wird automatisch neu deployen

### Resend API Key bekommen:

1. Gehe zu https://resend.com/
2. Kostenlos registrieren (100 E-Mails/Tag free)
3. Verifiziere deine E-Mail
4. Dashboard → **API Keys** → **"Create API Key"**
5. Name: z.B. "Hickmann Portfolio"
6. Permission: **"Full Access"** oder **"Send Only"**
7. Kopiere den Key (nur einmal sichtbar!)

### Wichtig:

- Der Schlüssel wird **NICHT** im Code gespeichert
- Cloudflare Pages Functions (functions/api/contact.ts) greifen automatisch darauf zu via `env.RESEND_API_KEY`
- Nach dem Speichern triggert Cloudflare automatisch einen neuen Deploy
- Das Kontaktformular funktioniert erst nach dem Deploy

### Testen:

Nach erfolgreichem Deploy:
1. Gehe auf deine Website
2. Öffne das Kontaktformular
3. Sende eine Test-Nachricht
4. Check deine E-Mail (andre@hickmann-kuschnereit.de)

### Troubleshooting:

**Falls es nicht funktioniert:**
1. Check Cloudflare Pages Logs (Deployments → Latest → Function Invocations)
2. Check Resend Dashboard → Logs (siehst du die API Calls?)
3. Stelle sicher der API Key ist "Full Access" oder mindestens "Send Only"

---

**Alternative ohne Resend:**
Du könntest das Kontaktformular auch mit anderen Services betreiben:
- Formspree (formspree.io)
- EmailJS (emailjs.com)  
- Web3Forms (web3forms.com)

Aber Resend ist die professionellste Lösung mit bester Deliverability.
