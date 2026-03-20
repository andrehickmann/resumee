# CV PDF Generator

Diese Dateien generieren professionelle PDFs deines Lebenslaufs automatisch aus den Content-Dateien.

## 🚀 Automatische PDF-Generierung (Empfohlen!)

Die einfachste Methode - PDFs werden automatisch aus den Content-Dateien erstellt:

```bash
npm run generate-pdf
```

Das erstellt:
- `public/Lebenslauf.pdf` (Deutsch)
- `public/Resume.pdf` (Englisch)

✨ **Vorteile:**
- Immer aktuell mit den Content-Dateien
- Konsistentes Design
- Ein Befehl für beide Sprachen
- Keine manuelle Arbeit nötig

## Dateien

- `scripts/generate-cv-pdf.js` - Automatischer PDF-Generator (Node.js)
- `cv-generator.html` - Deutsche Version (manuell)
- `cv-generator-en.html` - Englische Version (manuell)

## Alternative: Browser Print

Falls du das PDF manuell erstellen möchtest:

1. Öffne die HTML-Datei in deinem Browser:
   - Doppelklick auf `cv-generator.html` (Deutsch)
   - Doppelklick auf `cv-generator-en.html` (Englisch)

2. Drücke `Cmd+P` (Mac) oder `Ctrl+P` (Windows) zum Drucken

3. Wähle "Als PDF speichern" oder "Save as PDF"

4. Stelle sicher, dass folgende Einstellungen aktiv sind:
   - Layout: Hochformat / Portrait
   - Hintergrundgrafiken: An / Background graphics: On
   - Kopf-/Fußzeilen: Aus / Headers/Footers: Off

5. Speichere als `Lebenslauf-Andre-Hickmann.pdf`

## Inhalte

Das PDF enthält:
- ✅ Kontaktinformationen
- ✅ Profil-Zusammenfassung
- ✅ Vollständiger Technologie-Stack
- ✅ Berufserfahrung (chronologisch)
- ✅ Branchen- und Domänenerfahrung
- ✅ Ausbildung
- ✅ Ausgewählte Projekte

## Anpassungen

### Content ändern
Bearbeite die Content-Dateien und generiere neu:
```bash
# Inhalte in src/content.de.js oder src/content.en.js ändern
npm run generate-pdf
```

### Design anpassen
Bearbeite `scripts/generate-cv-pdf.js`:
- Farben ändern: Suche nach `const ACCENT = '#ff6b3d'`
- Layout anpassen: Ändere `margin`, `contentWidth`, etc.
- Schriftgrößen: Ändere `setFontSize()`-Werte

## Design

- 📄 DIN A4 Format (210mm x 297mm)
- 🎨 Professionelles, modernes Design
- 📱 Print-optimiert
- ✨ Highlight-Boxen für wichtige Infos
- 🧡 Orange Accent-Farbe (#ff6b3d)
- 🤖 Automatisch aus Content generiert

## Technologie

- **jsPDF**: PDF-Generierung
- **Node.js**: Automatisierung
- **ES Modules**: Moderne JavaScript-Module
