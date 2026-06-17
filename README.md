# mittwald Changelogs

POC für ein Keystatic-basiertes Changelog-CMS. Pflege über eine UI, Auslieferung
als gerenderte Seite **und** als JSON-API. Generisch über mehrere Produkte
(aktuell nur **mStudio**) – weitere Produkte = ein Eintrag in `src/lib/products.ts`.

## Stack

- [Astro](https://astro.build/) (`@astrojs/node`, standalone) – Host für Editor, API und Seite
- [Keystatic](https://keystatic.com/) (Editor-UI + Content-Schema, **GitHub-Storage**)
- [@markdoc/markdoc](https://markdoc.dev/) (Markdown ↔ HTML)

## Struktur

```
src/lib/products.ts           Single Source of Truth: Produkte (treibt Collections + Tabs)
keystatic.config.ts           Collections + Felder, Storage = GitHub
astro.config.mjs              Astro + React + Keystatic-Integration
src/lib/changelogs.ts         Datenschicht (Reader → { markdown, html }) für Seite + API
src/pages/index.astro         Changelog-Seite (/), eigenes Design, Tabs bei >1 Produkt
src/pages/api/v1/...          JSON-API
src/content/<produkt>/*.md    Changelog-Einträge je Produkt
```

Jeder Eintrag ist eine Markdown-Datei mit Frontmatter:

```markdown
---
title: 'Neue Domain-Verwaltung'
date: '2023-02-14'
---
- Überarbeitete **Domain-Übersicht** mit Filter- und Suchfunktion.
```

Pro Eintrag: `title` (Pflicht, zugleich Datei-Slug), `date` (Pflicht), Body als
Markdown (reduziert: fett, kursiv, Code, Links, Listen, Code-Block – keine
Überschriften/Tabellen/Bilder/Zitate).

## Entwicklung

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

- `/` – gerenderte Changelog-Seite, je Produkt, nach Datum sortiert
- `/keystatic` – Editor-UI (committet im GitHub-Mode direkt ins Repo)
- `/api/v1/changelogs/{product}` – JSON-API (siehe unten)

```bash
pnpm build      # Server-Build nach dist/ (Node-Adapter)
pnpm preview
```

## Pflege & Speicherung (GitHub-Mode)

Keystatic läuft im **GitHub-Storage** (`storage: { kind: "github", repo: "mittwald/changelogs" }`):
Der Editor schreibt nicht ins lokale Dateisystem, sondern **committet direkt ins
Repo**. Damit sind Edits persistent (in Git versioniert) und unabhängig vom
flüchtigen Container-Dateisystem.

**Ablauf:** Edit im `/keystatic` → Commit auf `master` → CI baut das Container-Image
neu (s.u.) → Deploy zieht die frische Version. Seite und API lesen den
Build-Stand der Inhalte (über den lokalen Reader).

**Setup (einmalig):** Eine [GitHub-App für Keystatic](https://keystatic.com/docs/github-mode)
anlegen und folgende Env-Vars setzen (Vorlage: `.env.example`):

| Variable | Zweck |
| --- | --- |
| `KEYSTATIC_GITHUB_CLIENT_ID` | GitHub-App Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | GitHub-App Client Secret |
| `KEYSTATIC_SECRET` | Signiert die Auth-Cookies (`openssl rand -hex 32`) |
| `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Slug der GitHub-App (clientseitig) |

Die OAuth-Callback-URL der App zeigt auf den Editor, z.B.
`https://changelogs.mittwald.de/api/keystatic/github/oauth/callback`.

## JSON-API

Für Produkt-Anwendungen, die die Changelogs zur Laufzeit abrufen. Daten- und
Render-Logik teilt sich die API mit der Startseite (`src/lib/changelogs.ts`).

| Route | Inhalt |
| --- | --- |
| `GET /api/v1/changelogs/{product}` | ein Produkt (aktuell `mstudio`), `404` bei unbekannt |

Antwort: `{ "data": … }`, Einträge je `{ slug, title, date, markdown, html }`
(Body als Roh-Markdown **und** gerendertes HTML), nach Datum absteigend sortiert.

**Auth:** keine – die API ist öffentlich lesbar (`GET`), inkl. CORS
(`Access-Control-Allow-Origin: *`) für cross-origin Browser-Frontends.

```bash
curl http://localhost:4321/api/v1/changelogs/mstudio
```

## Container & Deployment

Editor, JSON-API und gerenderte Seite laufen gemeinsam in **einem** Astro-Node-Server
– passend für einen mittwald-Container.

```bash
docker build -t changelogs .
docker run -p 4321:4321 \
  -e KEYSTATIC_GITHUB_CLIENT_ID=... \
  -e KEYSTATIC_GITHUB_CLIENT_SECRET=... \
  -e KEYSTATIC_SECRET=... \
  -e PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=... \
  changelogs
```

CI (`.github/workflows/container.yml`): bei Push auf `master` wird das Image gebaut
und nach `ghcr.io/mittwald/changelogs` gepusht. Der Container zieht es von dort;
die Keystatic-Env-Vars werden **im Container** gesetzt (nicht in der CI).

## Offen / nächste Schritte

- **Auth des Pflege-UI** (`/keystatic`): Zugriff wird über die GitHub-App-Berechtigung
  am Repo gesteuert. Wer pushen darf, darf pflegen – ggf. zusätzlich einschränken.
- **Live-Reads ohne Rebuild:** Aktuell liest die Seite/API den Build-Stand. Alternativ
  `createGitHubReader` (liest live aus GitHub) – spart Rebuilds, braucht aber einen
  Token zur Laufzeit.
- **Bilder:** im Markdoc-Feld abschaltbar/aktivierbar (`image`); braucht Ablage-Config
  + Auslieferung + ggf. absolute URLs in der API.
