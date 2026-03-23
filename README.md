# Resumee Landing Page

Modern Vue 3 + TypeScript portfolio with Vue Router and a dedicated legal route.

## Local Dev (Node)

```bash
npm install
npm run dev
```

Open: `http://localhost:5173`

### Under Construction Mode

To test the under construction page locally:

```bash
VITE_UNDER_CONSTRUCTION=true npm run dev
```

See [UNDER_CONSTRUCTION.md](./UNDER_CONSTRUCTION.md) for details.

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

**Note:** Production builds show the "Under Construction" page by default (via `.env.production`). To build the full site locally, use:

```bash
VITE_UNDER_CONSTRUCTION=false npm run build
```

## Lint & Format

```bash
npm run lint
npm run format
```

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

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Cloudflare Pages setup.

## Tech Stack

- Vue 3 + Vue Router
- Vue I18n
- TypeScript
- Vite
- ESLint + Prettier
