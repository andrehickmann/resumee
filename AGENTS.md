# Agent Instructions (resumee)

## Project Overview

- Vue 3 + TypeScript + Vue Router + vue-i18n
- UI split into `src/components/`
- Logic in `src/composables/`
- Content in `src/content.de.js` and `src/content.en.js`
- Routes:
  - `/` → `src/views/HomeView.vue`
  - `/legal` → `src/views/LegalView.vue`

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
