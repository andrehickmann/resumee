# Portfolio Website - André Hickmann Kuschnereit

> Modern, minimalist portfolio website for a Senior Software Engineer. Built with Vue 3, TypeScript, and deployed on Cloudflare Pages.

🌐 **Live:** [hickmann-kuschnereit.de](https://hickmann-kuschnereit.de)

[![CI](https://github.com/andrehickmann/resumee/actions/workflows/ci.yml/badge.svg)](https://github.com/andrehickmann/resumee/actions/workflows/ci.yml)

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

Open [http://resumee.localhost](http://resumee.localhost)

Traefik dashboard: [http://localhost:8080](http://localhost:8080)

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
- **Web3Forms** - Contact form backend (free tier)
- **hCaptcha** - Spam protection

## 📝 Content Management

### Updating Content

Edit content in language-specific files:
- **German:** `src/content.de.js`
- **English:** `src/content.en.js`

### Updating CV

1. Edit HTML templates: `public/cv-generator.html` or `public/cv-generator-en.html`
2. Open in browser
3. Print to PDF (Cmd/Ctrl + P)
4. Save as `Lebenslauf - André Hickmann Kuschnereit.pdf` or `Resume - André Hickmann Kuschnereit.pdf`
5. Replace files in `public/` directory

## 🌐 Deployment

### Cloudflare Pages

The site automatically deploys on push to `master` branch.

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

# Format code
npm run format

# Deploy to Cloudflare (requires wrangler auth)
npm run deploy
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

| Route | Description |
|-------|-------------|
| `/` | Main portfolio page |
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

Private project - All rights reserved.

---

**Built with ❤️ by André Hickmann Kuschnereit**
