# Kontaktformular Setup mit Web3Forms

## Warum Web3Forms statt Cloudflare Functions?

Cloudflare Pages erkennt das Projekt als "nur statische Assets", daher können wir keine Environment Variables für Functions setzen. Web3Forms ist die perfekte Alternative:

✅ **Keine Serverlogik** nötig
✅ **Kostenlos** bis 250 Submissions/Monat  
✅ **2 Minuten Setup**
✅ **Spam-Schutz** inklusive
✅ **DSGVO-konform**

## Setup in 3 Schritten:

### 1. Web3Forms Account erstellen

1. Gehe zu https://web3forms.com/
2. Klicke auf **"Get Started - It's Free"**
3. Registriere dich mit deiner E-Mail (andre@hickmann-kuschnereit.de)
4. Bestätige die E-Mail

### 2. Access Key erhalten

1. Nach Login siehst du dein Dashboard
2. Klicke auf **"Create New Access Key"**
3. **Name:** "Hickmann Portfolio Contact"
4. **Email:** andre@hickmann-kuschnereit.de (Empfänger-E-Mail!)
5. Klicke **"Create"**
6. **Kopiere den Access Key** (sieht aus wie: `abc123def-456g-789h-ijk1-lmn234opq567`)

### 3. Access Key im Code eintragen

Öffne `src/views/HomeView.vue` und suche nach:

```javascript
formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY'); // TODO: Replace with your key
```

Ersetze `'YOUR_WEB3FORMS_ACCESS_KEY'` mit deinem kopierten Access Key:

```javascript
formData.append('access_key', 'abc123def-456g-789h-ijk1-lmn234opq567');
```

### 4. Commit & Deploy

```bash
git add src/views/HomeView.vue
git commit -m "Add Web3Forms access key"
git push origin master
```

Warte 2-3 Minuten bis Cloudflare deployed hat.

## Testen

1. Gehe auf https://hickmann-kuschnereit.de
2. Öffne das Kontaktformular
3. Fülle es aus und sende
4. Check deine E-Mail (andre@hickmann-kuschnereit.de)
5. Du solltest die Nachricht erhalten!

## Features

### Was funktioniert:

- ✅ E-Mails kommen direkt bei dir an
- ✅ Spam-Schutz (Honeypot)
- ✅ Success/Error Feedback im Modal
- ✅ Auto-Close nach Erfolg
- ✅ Alle Formularfelder (Name, E-Mail, Rolle, Nachricht)

### Web3Forms Dashboard:

Im Dashboard siehst du:
- Alle eingegangenen Submissions
- Spam-Filter Stats
- E-Mail Delivery Status

## Troubleshooting

**E-Mail kommt nicht an?**
- Check Spam-Ordner
- Verifiziere dass im Web3Forms Dashboard die richtige E-Mail steht
- Check Web3Forms Dashboard → Submissions (siehst du den Entry?)

**Formular funktioniert nicht?**
- Öffne Browser Console (F12)
- Siehst du Fehler?
- Access Key richtig eingetragen? (ohne Anführungszeichen inner den String!)

**Spam-Problem?**
- Web3Forms filtert automatisch
- Du kannst im Dashboard zusätzliche Spam-Filter aktivieren
- reCAPTCHA kann optional hinzugefügt werden

## Upgrade später (optional)

**Wenn du mehr als 250 Submissions/Monat brauchst:**
- Web3Forms Pro: $5/Monat für 1000 Submissions
- Oder zurück zu Cloudflare Workers (wenn Functions dann funktionieren)

**Custom E-Mail Template:**
- Web3Forms Pro erlaubt HTML-E-Mails
- Webhook Integration möglich

## Vorteile gegenüber Cloudflare Functions:

1. ✅ Funktioniert sofort ohne Environment Variables
2. ✅ Einfacheres Setup
3. ✅ Kein Servercode zu warten
4. ✅ Web3Forms kümmert sich um Spam, Delivery, etc.
5. ✅ Dashboard mit Statistiken

Viel Erfolg! 🚀
