# CV PDF Generator

Diese Dateien generieren ein professionelles PDF deines Lebenslaufs.

## Dateien

- `cv-generator.html` - Deutsche Version
- `cv-generator-en.html` - Englische Version

## So erstellst du das PDF:

### Methode 1: Browser Print (einfachste Methode)

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

### Methode 2: Kommandozeile (für Entwickler)

Mit Chrome/Chromium:
```bash
# Deutsch
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --print-to-pdf=Lebenslauf.pdf \
  cv-generator.html

# Englisch
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
  --headless --disable-gpu --print-to-pdf=Resume.pdf \
  cv-generator-en.html
```

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

Die HTML-Dateien können direkt bearbeitet werden:
- Farben ändern: Suche nach `#ff6b3d` (Accent-Farbe)
- Layout anpassen: CSS im `<style>` Block
- Inhalte aktualisieren: Direkter Text-Edit im HTML

## Design

- 📄 DIN A4 Format (210mm x 297mm)
- 🎨 Professionelles, modernes Design
- 📱 Print-optimiert
- ✨ Highlight-Boxen für wichtige Infos
- 🎯 Orange Accent-Farbe (#ff6b3d)
