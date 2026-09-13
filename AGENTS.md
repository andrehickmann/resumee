# Agent Instructions (resumee)

## Project Overview

- Vue 3 + TypeScript + Vue Router + vue-i18n
- UI split into `src/components/`; the portfolio page lives in `src/components/terminal/`
- Logic in `src/composables/`
- Content in `src/content.de.js` and `src/content.en.js`
- Routes:
  - `/` → `src/views/TerminalView.vue`
  - `/legal` → `src/views/LegalView.vue`

## `useHead` does not reach the prerendered HTML

`npm ls unhead` shows two instances: the app resolves `@unhead/vue` to the root copy,
while `vite-ssg` installs the head plugin from its own nested `@unhead/vue@2.x`. Entries
registered by `useHead` therefore land on a different instance than the one vite-ssg
renders from, and **none of them appear in `dist/*.html`** - no title, no canonical, no
meta. They only apply after hydration.

Consequences until this is fixed:

- crawlers and social scrapers see only the static tags in `index.html`
- `dist/legal.html` carries the title and description of the home page
- anything that must be in the served HTML belongs in `index.html`, not in `useHead`

Verify with a probe rather than by reading the code - add a marker to `useHead`, build,
and grep `dist/index.html` for it.

Fixing it means aligning the versions so a single instance is installed, which is a
dependency change and belongs in the container.

## Assets in `public/`

Files under `public/` keep their name in the build - Vite hashes only what it bundles.
`docker/nginx.conf` sends images with `max-age=604800`, and Cloudflare caches them, so
**replacing an image in place does not reach visitors for up to a week**, even though the
deploy is correct and the origin already serves the new file.

Therefore: when the content of an image changes, **give it a new file name** and update
every reference (the component, plus the `og:image`, `twitter:image` and JSON-LD entries
in `index.html`). Diagnose a suspected stale asset at the origin rather than through the
proxy:

```bash
curl -sD- -o /dev/null https://hickmann-kuschnereit.de/<datei> | grep -i 'cf-cache-status\|age\|content-length'
ssh hk-server 'docker exec resumee-web-1 ls -l /usr/share/nginx/html/<datei>'
```

PDFs get no `expires` from nginx, but Cloudflare caches them on its own for four hours,
so a replaced CV is stale for that long too - shorter than an image, not exempt. Different
edge nodes can hold different generations at the same time, so one `curl` that looks
current does not prove the rollout is done.

## Styles

- `src/base.css` is a global reset and nothing else. Keep it that way - in particular
  do not add `overflow-x: hidden` there, it turns every ancestor into a scroll
  container and silently breaks `position: sticky` for the title bar, the explorer
  and the status bar.
- `src/terminal.css` holds the design tokens and every rule of the portfolio page,
  all below `.term`.
- `LegalView.vue` and `UnderConstruction.vue` bring their own scoped styles and do
  not depend on anything global.

## Required Workflow (Always)

1. **Create a new branch** for every feature or fix.
2. **Follow DRY** – avoid duplication; extract helpers/composables when logic repeats.
3. **Component encapsulation** – components should do one thing well.
4. **Move logic to composables** – keep components thin.
5. **Write component tests** for new/changed UI behavior.
6. **Use the Docker container for installs and dependency changes** – do not run `npm install`, `npm ci`, lockfile regeneration, or dependency updates on the host machine. Use the app container from `docker compose`, which is the canonical Node/Linux environment for this repo.
7. **Before commit/push, run:**
   - `npm run lint`
   - `npm run typecheck`
   - `npm run test` (if tests exist; otherwise add tests first)

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Format: `npm run format`
- Container install/update: `docker compose run --rm app npm install`
- Container clean reinstall: `docker compose run --rm app sh -lc "rm -rf node_modules package-lock.json && npm install"`

## Code Structure Notes

- Prefer `src/composables/*` for shared logic
- Keep i18n strings in `src/content.de.js` and `src/content.en.js`
- Keep UI sections in `src/components/*`

## Testing Guidance

- Use component tests for new UI (e.g., `@vue/test-utils` + `vitest`)
- Cover behaviors like filtering, modals, and slider interactions

## Branching

- Use clear branch names, e.g. `feat/xxx`, `fix/xxx`, `chore/xxx`
