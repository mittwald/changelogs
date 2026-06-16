# mittwald Changelogs

POC für ein Keystatic-basiertes Changelog-CMS für **mStudio** und **Nexus**.
Pflege der Changelogs über eine UI, Anzeige als statische Seite – ohne CMS-Backend.

## Stack

- [Astro](https://astro.build/) (Host + statische Ausgabe)
- [Keystatic](https://keystatic.com/) (Editor-UI + Content-Schema, läuft im Astro-Projekt)
- [@markdoc/markdoc](https://markdoc.dev/) (Rendering des Markdown-Bodys auf der Startseite)

## Struktur

```
keystatic.config.ts        Collections + Felder (mStudio, Nexus)
astro.config.mjs           Astro + React + Keystatic-Integration
src/pages/index.astro      Changelog-Anzeige (/), getrennt nach mStudio/Nexus
src/content/mstudio/*.md   Changelog-Einträge mStudio
src/content/nexus/*.md     Changelog-Einträge Nexus
```

Jeder Eintrag ist eine Markdown-Datei mit Frontmatter:

```markdown
---
title: 'Neue Domain-Verwaltung'
date: '2023-02-14'
---
- Überarbeitete **Domain-Übersicht** mit Filter- und Suchfunktion.
```

Pro Eintrag: `title` (Pflicht, ist zugleich der Datei-Slug), `date` (Pflicht),
Body als Markdown (reduzierter Funktionsumfang: fett, kursiv, Code, Links, Listen,
Code-Block – keine Überschriften/Tabellen/Bilder/Zitate).

## Entwicklung

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

- `/` – gerenderte Changelog-Seite, nach mStudio/Nexus getrennt, je nach Datum sortiert
- `/keystatic` – Editor-UI (im Local-Mode schreibt sie direkt in `src/content/…`)

```bash
pnpm build      # statische Ausgabe nach dist/
pnpm preview
```

## Anforderung

Redakteur:innen pflegen Changelogs für mStudio und Nexus über eine UI. Neue oder
geänderte Einträge müssen in mStudio sichtbar werden, **ohne dass dafür ein
mStudio-Deployment nötig ist**.

Was dieser POC zeigt: das Pflege-UI (`/keystatic`) und ein Schema/Datenmodell für
die Changelogs. Wie Pflege, Speicherung und Auslieferung an mStudio/Nexus konkret
umgesetzt werden, entscheiden Architektur/Entwicklung.

## Zu entscheiden (Architektur/Dev)

- **Wo werden die Changelogs gespeichert und wie wird das Pflege-UI abgesichert?**
  Keystatic kann lokal ins Dateisystem oder direkt in ein Git-Repo schreiben.
- **Wie kommen die Changelogs in mStudio/Nexus, ohne Deployment?**
  Die Hauptanwendungen müssen die Inhalte zur Laufzeit beziehen können.
- **Wer darf pflegen?** Authentifizierung der Pflege-UI.
