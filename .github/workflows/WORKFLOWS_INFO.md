# GitHub Actions Workflows

## Current Workflows

### ci.yml - Continuous Integration

**Purpose:** Checks code quality for pull requests and feature branches.

**When it runs:**

- On every push to branches except `master` and `main`
- On every pull request

**What it does:**

1. ✅ Node.js 24 Setup
2. ✅ Installs dependencies with `npm ci`
3. ✅ Runs linting with `npm run lint`
4. ✅ Runs type checking with `npm run typecheck`
5. ✅ Runs tests with `npm run test`
6. ✅ Verifies the build with `npm run build`

**Important:** This workflow does not run on `master` or `main`; production deployment is handled separately.

---

## Deployment

**Production deployment is triggered by GitHub Releases:**

1. Run `create-release.yml` from `master`
2. Choose `patch`, `minor`, or `major`
3. The workflow bumps `package.json` and `package-lock.json`, runs lint, typecheck, tests, and build, then creates a commit on `master`, tags it, pushes both, and publishes the GitHub release
4. `release-deploy.yml` validates the tag against `package.json`, builds the app, and deploys it to Cloudflare
5. The site goes live on hickmann-kuschnereit.de

**Important:** Keep Cloudflare Pages auto-deploy disabled in the dashboard.

---

## Preview Deployments (Pull Requests)

**Every pull request** creates a preview deployment:

`https://resumee-pr-<PR_NUMBER>.andre-hickmann-ger.workers.dev`

The workflow posts the preview URL directly to the pull request.

---

## CI/CD Flow

```
Feature Branch
    ↓
Push/PR → GitHub Actions CI (lint + typecheck + test + build)
    ↓
Merge to `master`
    ↓
Run `create-release.yml` (`patch` / `minor` / `major`)
    ↓
GitHub Actions Release Deploy
    ↓
Live on hickmann-kuschnereit.de
```

---

## Node.js Versions

- **CI Workflow:** Node.js 24
- **Create Release:** Node.js 24
- **Release Deploy:** Node.js 24
- **Preview Deploy:** Node.js 24
- **Local Development:** As defined in `package.json`

**GitHub Actions Runtime**

- All repository workflows use current action majors that are compatible with the Node 24 runtime.
- Warnings from `Analyze` or `Upload Results` may still come from GitHub Code Scanning or GitHub's default setup rather than from these workflow files.
