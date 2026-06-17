# mittwald Changelogs

Keystatic-basiertes Changelog-CMS: Pflege über UI, Auslieferung als Seite + JSON-API.
Generisch über mehrere Produkte (aktuell **mStudio**) — neues Produkt = ein Eintrag in `src/lib/products.ts`.

**Stack:** Astro (`@astrojs/node`, standalone) · Keystatic (GitHub-Storage) · Markdoc

## Entwicklung

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build
```

- `/` — Changelog-Seite (Tabs bei mehreren Produkten)
- `/keystatic` — Editor (committet im GitHub-Mode direkt ins Repo)
- `/api/v1/changelogs/{product}` — JSON-API

## JSON-API

`GET /api/v1/changelogs/{product}` — aktuell `mstudio` (sonst `404`). Öffentlich, mit CORS.

```json
{ "data": [ { "slug": "…", "title": "…", "date": "…", "markdown": "…", "html": "…" } ] }
```

Nach Datum absteigend sortiert; Body als Roh-Markdown **und** gerendertes HTML.

## Env-Vars (Keystatic GitHub-Mode)

Zur Laufzeit am Container setzen (nichts im Image). Vorlage: `.env.example`.

| Variable | Zweck |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` / `…_SECRET` | GitHub-App-Credentials |
| `KEYSTATIC_SECRET` | Cookie-Signatur (`openssl rand -hex 32`) |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | GitHub-App-Slug |

OAuth-Callback der App: `https://changelogs.mittwald.de/api/keystatic/github/oauth/callback`

## Container & CI

```bash
docker build -t changelogs .
docker run -p 4321:4321 -e KEYSTATIC_GITHUB_CLIENT_ID=… …weitere envs… changelogs
```

Push auf `master` → CI (`.github/workflows/container.yml`) baut das Image, pusht nach
`ghcr.io/mittwald/changelogs:latest` und triggert den Deploy-Hook (`DEPLOY_WEBHOOK_URL`).
Edit im Editor → Commit auf `master` → Rebuild → Redeploy.
