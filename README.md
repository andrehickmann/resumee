# Resumee Landing Page for me

Modern single‑page Vue app for a senior developer portfolio, plus a separate legal page.

## Local Dev (Node)

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

## Local Dev (Docker + Traefik)

```bash
docker compose up --build
```

Open: `http://resumee.localhost`

Traefik dashboard: `http://localhost:8080`

If `resumee.localhost` does not resolve, add it to your hosts file:

```
127.0.0.1 resumee.localhost
```

## Build

```bash
npm run build
```

The production build is in `dist/`.

## Content

Main content lives in `src/content.js`.

Translations live in:
- `src/content.de.js`
- `src/content.en.js`

## Files to Provide

- `public/portrait.jpg`
- `public/Lebenslauf.pdf`

## Routes

- `/` (main portfolio)
- `/legal` (Impressum & Datenschutz)
