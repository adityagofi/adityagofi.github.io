# Gofi Portfolio

React + TypeScript + Vite portfolio with static HTML generation for each route.

## Development

- `npm ci`
- `npm run dev` — development server at http://localhost:3000
- `npm run lint` — TypeScript validation
- `npm run build` — production bundles, 13 rendered HTML documents, sitemap and robots file
- `npm run check:build` — validate generated pages, metadata, asset references, links and anchors
- `npm run preview -- --port 4173` — inspect the production build

## Site configuration

Set `VITE_SITE_URL` in `.env.local` to the production origin before building.
The default is `https://adityagofi.github.io`, matching this repository's GitHub Pages homepage.
Use a single canonical origin when hosting the same portfolio in multiple places.
Set `VITE_ENABLE_ANALYTICS=true` only when Vercel Web Analytics is configured; it defaults to off for GitHub Pages.

- Contact information: `src/lib/site.ts`
- Portfolio categories, descriptions, tags and covers: `src/lib/constants.ts`
- Routes and titles: `src/router/routes.ts`
- Page descriptions, social metadata and JSON-LD: `src/lib/seo.ts`
- Shared visual styles: `src/index.css`
- Detailed project content: `src/pages/projects/`

Navigation uses native links. Each page loads its own component bundle and hydrates the rendered HTML.
This keeps open-in-new-tab, browser history, deep links and anchors working normally.

## Hosting

Publish the contents of `dist`.
The build emits both `/route.html` and `/route/index.html` for Vercel clean URLs and GitHub Pages respectively.
Vercel uses the included `vercel.json`; it no longer rewrites unknown URLs to the home page.
GitHub Pages can still use `npm run deploy`. Deployment has not been run as part of the audit.

Photography is a curated-state page with `noindex`, excluded from the work grid and sitemap until its real images are available.
An incomplete motion project is preserved in `docs/unpublished-project.txt`.

See `docs/AUDIT.md` for findings, fixes, verification and remaining content tasks.
