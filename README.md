# Joensuun Telemaailma – website redesign demo

Speculative redesign by **Hades Design** for Joensuun Telemaailma Oy / SolarWorks
(original site: https://www.telemaailma.com/). Concept demo – not the company's
official website; indexing is disabled.

**Live demo:** https://samijturunen01.github.io/telemaailma-demo/

## Stack

React 19 · Vite · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP + ScrollTrigger ·
Lucide · static prerendering (`scripts/prerender.mjs`) · Playwright + axe.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5173/telemaailma-demo/
npm run build        # typecheck + build + prerender to dist/
npm run preview      # serve dist/ like GitHub Pages (port 4173)
npm run lint
npx playwright install chromium   # once
npm test             # e2e + accessibility (needs a build)
npm run assets       # regenerate optimised images from source-assets/
node scripts/trace-logo.mjs       # regenerate the SolarWorks SVG
```

## Structure

```
src/components/   layout, brand, home (tuner), solar, antenna, art, forms, ui
src/pages/        one file per route
src/data/         company facts, channels, navigation, SEO, credentials, service area
src/lib/          motion, sun geometry, arc geometry, form transport/validation
scripts/          asset pipeline, logo tracing, prerender, static server, QA capture
docs/             sources, provenance, improvements, project status
```

## Forms

`src/lib/forms/transport.ts` – the demo uses `createDemoTransport()`, which never
sends or stores anything and shows "Demoversio – viestiä ei lähetetty."
A Google Apps Script transport is prepared but inactive. In production:
set `VITE_FORM_MODE=apps-script`, `VITE_APPS_SCRIPT_URL`, load reCAPTCHA v3 with
the public site key, and verify the token **server-side** in Apps Script (secret
key only there).

## Going to production

1. Customer approves content (see `docs/CONTENT_SOURCES.md` → VERIFY list)
2. `VITE_BASE_PATH=/`, `SITE_URL=https://www.telemaailma.com/`, `VITE_ALLOW_INDEXING=true`
3. Redirects from old URLs and solarworks.fi (see `docs/REDESIGN_IMPROVEMENTS.md`)
4. Form backend + reCAPTCHA, privacy notice (tietosuojaseloste), cookie policy if analytics are added
