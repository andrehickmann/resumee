# GitHub Actions Workflows

## Current Workflows

### ci.yml — Continuous Integration

**Purpose:** Checks code quality for pull requests.

**When it runs:** On every pull request.

It deliberately does **not** run on plain pushes. It used to trigger on both
`push` and `pull_request`, which meant every commit on a branch with an open PR
ran the whole pipeline twice. Before a merge the checks run through the PR
anyway, so the second run said nothing new.

**What it does:**

1. ✅ Node.js 24 setup
2. ✅ Installs dependencies with `npm ci`
3. ✅ Runs linting with `npm run lint`
4. ✅ Runs type checking with `npm run typecheck`
5. ✅ Runs tests with `npm run test`
6. ✅ Verifies the build with `npm run build`

### vserver-deploy.yml — Deploy (vServer)

The single path that changes what runs in production. Called by
`publish-release.yml` and available manually via `workflow_dispatch`.

It opens an SSH connection to the vServer and runs `scripts/deploy.sh` there —
the server pulls the ref, rebuilds the image and swaps the container. Building
happens on the server, so no image registry is involved. Afterwards the workflow
checks from the outside that the site answers with 200.

**Required secrets:** `VSERVER_HOST`, `VSERVER_USER`, `VSERVER_SSH_KEY`,
`VSERVER_SSH_KNOWN_HOSTS`, `VSERVER_HEALTHCHECK_URL`.

### Other workflows

| Workflow                    | Trigger                                  | Purpose                                       |
| --------------------------- | ---------------------------------------- | --------------------------------------------- |
| `create-release.yml`        | manual                                   | Bumps the version and opens a release PR      |
| `publish-release.yml`       | push to `master` touching `package.json` | Publishes the release and deploys             |
| `preview-deploy.yml`        | pull request                             | Preview deployment on Cloudflare Workers      |
| `codeql.yml`                | push, PR, weekly                         | Code scanning                                 |
| `dependency-review.yml`     | pull request                             | Flags risky dependency changes                |
| `dependabot-auto-merge.yml` | pull request                             | Merges Dependabot patch/minor after CI passes |

---

## Deployment

Production runs on an own vServer, behind the Traefik reverse proxy that serves
the other projects on that machine. Cloudflare sits in front as DNS and proxy
with SSL mode **Full (strict)**.

1. Run `create-release.yml` from `master`
2. Choose `patch`, `minor`, or `major`
3. The workflow bumps `package.json` and `package-lock.json`, runs lint, typecheck, tests and build, then opens a release PR against `master`
4. Merge the release PR into `master`
5. `publish-release.yml` creates the Git tag, publishes the GitHub release, and then runs the deploy as a dependent job
6. The site goes live on hickmann-kuschnereit.de

**Why the deploy is a job inside `publish-release.yml`** and not a workflow
reacting to `release: published`: a release created with the `GITHUB_TOKEN` does
not trigger further workflows. Reacting to that event would produce a release
flow that never deploys — and looks green while doing so.

### Where to see whether a release deployed

- **Releases:** the repository's Releases page
- **Release + deploy result:** Actions → _Publish Release_. The deploy is a job
  **inside** that run (expand it and look for `deploy`), not a separate entry,
  because it is called as a reusable workflow.
- **Deployment history with timestamps:** the repository's Deployments page.
  Note that this page does not exist yet — GitHub creates the `production`
  environment the first time the deploy job runs, and the page appears with the
  first deployment entry. Until then `/deployments` answers 404. Deploys made by
  running `scripts/deploy.sh` on the server directly do not show up there either;
  only runs through the workflow are recorded.
- **Manually triggered deploys** appear as their own runs under
  Actions → _Deploy (vServer)_.

### Rolling back

`scripts/deploy.sh` accepts any tag, branch or commit and prints the previous
revision when it finishes:

```bash
ssh <server> '/opt/resumee/scripts/deploy.sh v1.1.10'
```

---

## Preview Deployments (Pull Requests)

**Every pull request** creates a preview deployment on Cloudflare Workers:

`https://resumee-pr-<PR_NUMBER>.andre-hickmann-ger.workers.dev`

The workflow posts the preview URL directly to the pull request. Previews stayed
on Cloudflare when production moved to the vServer: hosting them on the server
would need a wildcard subdomain with a DNS-01 certificate, and therefore a
Cloudflare API token inside the shared Traefik. That is also why `wrangler` and
`wrangler.jsonc` are still part of the project.

---

## CI/CD Flow

```
Feature Branch
    ↓
Pull Request → CI (lint + typecheck + test + build) + preview deploy
    ↓
Merge to `master`
    ↓
Run `create-release.yml` (`patch` / `minor` / `major`)
    ↓
Merge the generated release PR
    ↓
Publish Release  →  deploy job  →  SSH  →  scripts/deploy.sh on the server
    ↓
Live on hickmann-kuschnereit.de
```

---

## Node.js Versions

- **CI Workflow:** Node.js 24
- **Create Release:** Node.js 24
- **Publish Release:** Node.js 24
- **Preview Deploy:** Node.js 24
- **Local Development:** As defined in `package.json`

The deploy workflow needs no Node.js: it only opens an SSH connection, and the
build runs on the server inside the container.

**GitHub Actions Runtime**

- All repository workflows use current action majors that are compatible with the Node 24 runtime.
- Code scanning runs through `codeql.yml` ("advanced setup"); GitHub's default setup is not configured. A pull request therefore shows two entries: the `Analyze` job doing the work, and a short `CodeQL` status check summarising the result. That is one scan, not two.
- `Analyze` or `Upload Results` may emit warnings that come from GitHub Code Scanning itself rather than from these workflow files.
