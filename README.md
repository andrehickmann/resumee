# Portfolio Website - André Hickmann Kuschnereit

> Modern, minimalist portfolio website for a Senior Software Engineer. Built with Vue 3, TypeScript, and deployed on Cloudflare Pages.

🌐 **Live:** [hickmann-kuschnereit.de](https://hickmann-kuschnereit.de)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 🌍 **Bilingual** - Full German/English support (Vue I18n)
- 📱 **Responsive** - Works perfectly on all devices
- 🎯 **Interactive Timeline** - Visual career journey with project highlights
- 📧 **Contact Form** - Web3Forms integration with hCaptcha spam protection
- 📄 **CV Download** - German & English PDF resumes
- ⚡ **Lightning Fast** - Deployed on Cloudflare Pages
- 🔒 **Privacy-Focused** - DSGVO-compliant with Impressum & Datenschutz

## 🚀 Quick Start

### Prerequisites

- Node.js 24+
- npm 10+

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Docker Development (with Traefik)

```bash
# Start with Docker Compose
docker compose up --build
```

Open [http://resumee.localhost:81](http://resumee.localhost:81)

API: [http://localhost:3000/health](http://localhost:3000/health)

Traefik dashboard: [http://localhost:8081](http://localhost:8081)

**Note:** If `resumee.localhost` doesn't resolve, add to `/etc/hosts`:

```
127.0.0.1 resumee.localhost
```

## 🏗️ Project Structure

```
.
├── public/
│   ├── portrait.jpg                    # Profile photo
│   ├── Lebenslauf - *.pdf             # German CV
│   ├── Resume - *.pdf                 # English CV
│   ├── cv-generator.html              # German CV template
│   ├── cv-generator-en.html           # English CV template
│   └── sitemap.xml                    # SEO sitemap
├── src/
│   ├── components/
│   │   ├── SiteHeader.vue             # Navigation header
│   │   ├── ContactModal.vue           # Contact form modal
│   │   ├── TimelineSection.vue        # Career timeline
│   │   └── ...
│   ├── views/
│   │   ├── HomeView.vue               # Main portfolio page
│   │   ├── UnderConstruction.vue      # Launch placeholder
│   │   └── LegalView.vue              # Impressum & Datenschutz
│   ├── content.de.js                  # German content
│   ├── content.en.js                  # English content
│   └── router/index.ts                # Vue Router config
├── server/
│   ├── prisma/                        # PostgreSQL schema, migrations, seed
│   ├── src/                           # Fastify API
│   └── tests/                         # API tests
├── .env.production                    # Production env vars
├── wrangler.jsonc                     # Cloudflare config
└── docker-compose.yml                 # Docker setup

```

## 🛠️ Tech Stack

### Frontend

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe development
- **Vue Router** - Client-side routing
- **Vue I18n** - Internationalization

### Build & Development

- **Vite** - Lightning-fast build tool
- **ESLint** - Code linting
- **Prettier** - Code formatting

### Deployment & Services

- **Cloudflare Pages** - Edge deployment
- **Fastify API** - Read-only resume data backend
- **PostgreSQL + Prisma** - Dynamic resume data storage
- **Web3Forms** - Contact form backend (free tier)
- **hCaptcha** - Spam protection

## 📝 Content Management

### Updating Frontend Copy

Edit UI labels, navigation and static page copy in language-specific files:

- **German:** `src/content.de.js`
- **English:** `src/content.en.js`

Dynamic resume data (projects, skills, services, industries and timeline entries) is loaded from the API. The same content files remain the frontend fallback if the API is unavailable.

### Resume API

The backend lives in `server/` and exposes:

- `GET /health`
- `GET /v1/resume?locale=de|en`

Local API setup:

```bash
# Start frontend, API and PostgreSQL
docker compose up --build

# Apply database migrations
docker compose run --rm api npm run prisma:deploy

# Seed initial DE/EN resume data from src/content.*.js
docker compose run --rm api npm run prisma:seed
```

Backend environment variables:

- `DATABASE_URL`
- `PORT`
- `CORS_ORIGINS`
- `NODE_ENV`

For Docker development, `CORS_ORIGINS` includes `http://resumee.localhost:81`.

Frontend API configuration:

```bash
VITE_API_BASE_URL=http://localhost:3000
```

Production default: `https://api.hickmann-kuschnereit.de`

### Production API Deployment (Render + Neon)

Recommended production split:

- Frontend: Cloudflare
- API: Render web service from `render.yaml`
- Database: Neon Postgres

Neon setup:

1. Create a Neon project.
2. Copy the pooled connection string as `DATABASE_URL`.
3. Copy the direct connection string as `DIRECT_URL`.
4. Use the `?sslmode=require` parameter from Neon if it is included in the connection string.

Render setup:

1. Create a new Blueprint from this repository.
2. Select `render.yaml`.
3. Set these environment variables on the `resumee-api` service:
   - `DATABASE_URL`: Neon pooled connection string
   - `DIRECT_URL`: Neon direct connection string
   - `CORS_ORIGINS`: `https://hickmann-kuschnereit.de,https://www.hickmann-kuschnereit.de`
4. Deploy the service.
5. Add `api.hickmann-kuschnereit.de` as a custom domain in Render.
6. Add the Render-provided DNS record in Cloudflare.

The production container runs Prisma migrations on start via `npm run start:prod`. Initial seed data must be loaded manually once:

```bash
docker compose run --rm \
  -e DATABASE_URL="<neon pooled connection string>" \
  -e DIRECT_URL="<neon direct connection string>" \
  -e NODE_ENV=production \
  -e ALLOW_PRODUCTION_SEED=true \
  api npm run prisma:seed
```

Do not run the production seed again after content is edited in the database; the seed clears and recreates dynamic resume data for each locale.

### Updating CV

1. Edit HTML templates: `public/cv-generator.html` or `public/cv-generator-en.html`
2. Open in browser
3. Print to PDF (Cmd/Ctrl + P)
4. Save as `Lebenslauf - André Hickmann Kuschnereit.pdf` or `Resume - André Hickmann Kuschnereit.pdf`
5. Replace files in `public/` directory

## 🌐 Deployment

### Cloudflare Pages

Deployments are triggered by **GitHub Releases** (published). A release build is pushed to Cloudflare.

**Important:** Disable automatic Cloudflare Pages builds for this repo, otherwise pushes to `master` will still deploy.

**Required GitHub Secrets:**

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Preview Deployments (Pull Requests)

Every Pull Request creates a **preview deployment** on Cloudflare at:

`https://resumee-pr-<PR_NUMBER>.workers.dev`

The workflow comments the URL back on the PR.

**Environment Variables:**

- `VITE_UNDER_CONSTRUCTION` - Set to `false` in production (configured in `.env.production`)

### Under Construction Mode

To enable maintenance/under-construction page:

```bash
# .env.production
VITE_UNDER_CONSTRUCTION=true
```

Then commit and push:

```bash
git add .env.production
git commit -m "Enable under construction mode"
git push
```

## 📧 Contact Form Setup

The contact form uses **Web3Forms** (free tier: 250 submissions/month).

### Setup:

1. Get access key from [web3forms.com](https://web3forms.com)
2. Update `src/views/HomeView.vue` (line ~258):
   ```javascript
   formData.append('access_key', 'YOUR_ACCESS_KEY');
   ```
3. Enable **hCaptcha** in Web3Forms dashboard

See [WEB3FORMS_SETUP.md](./WEB3FORMS_SETUP.md) for detailed instructions.

## 🧪 Development Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Typecheck
npm run typecheck

# Run tests
npm run test

# Test coverage
npm run test:coverage

# Format code
npm run format

# Deploy to Cloudflare (requires wrangler auth)
npm run deploy
```

### Backend Commands

Run backend commands through Docker:

```bash
docker compose run --rm api npm run lint
docker compose run --rm api npm run typecheck
docker compose run --rm api npm run test
docker compose run --rm api npm run prisma:deploy
docker compose run --rm api npm run prisma:seed
```

## 🐳 Docker Commands

```bash
# Build and start
docker compose up --build

# Start in background
docker compose up -d

# Stop
docker compose down

# View logs
docker compose logs -f app
```

## 🔒 Privacy & Legal

- **Impressum:** `/legal#impressum`
- **Datenschutz:** `/legal#datenschutz`
- Fully DSGVO-compliant
- No tracking, no cookies, no analytics

## 📄 Routes

| Route    | Description             |
| -------- | ----------------------- |
| `/`      | Main portfolio page     |
| `/legal` | Impressum & Datenschutz |

## 🎨 Customization

### Colors & Theme

Main colors are defined in `src/style.css`:

- Primary: `#64ffda` (cyan)
- Background: `#0a192f` (dark blue)
- Text: `#ccd6f6` (light blue-gray)

### Fonts

- **Headings:** Space Grotesk
- **Body:** Space Grotesk
- **Code:** JetBrains Mono

Loaded from Google Fonts in `index.html`.

## 📊 SEO

- Semantic HTML5
- Open Graph meta tags
- Twitter Card meta tags
- Structured data (JSON-LD)
- Sitemap.xml
- Robots.txt (allows all)

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork it for your own use!

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by André Hickmann Kuschnereit**
