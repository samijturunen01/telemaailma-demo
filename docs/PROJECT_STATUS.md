# Project status – Telemaailma redesign demo

_Last updated: 2026-11-17_

## Current phase

Phase 12 – Deployment (GitHub Pages). All pages built, tested locally.

## Completed

- Research: current site incl. hidden `/tuotteet` pages, archived solarworks.fi (Wayback), press articles, registries → `docs/CONTENT_SOURCES.md`
- Strategy → `docs/REDESIGN_IMPROVEMENTS.md`; assets → `docs/ASSET_PROVENANCE.md`
- Creative concept "Kenttä" (signal field / terrain), SolarWorks-arc graphic language
- SolarWorks logo vector-recreated from the original artwork (`scripts/trace-logo.mjs`)
- Responsive AVIF/WebP/JPEG pipeline (`npm run assets`)
- Pages: Etusivu (tuner hero + intro), Aurinkosähkö (sun-path explorer, IV report, FAQ), Palvelut hub,
  Antenniasennukset (coverage radar), Ajoneuvoasennukset, Tuotteet (sticky category nav),
  Metsästys ja maasto, Tietoa meistä (scroll-linked timeline), Yhteystiedot (demo form), branded 404
- Static prerendering per route with metadata + JSON-LD, `noindex`, robots Disallow
- Scroll management: top on navigation, hash anchors, back/forward restoration (transition-safe)
- Playwright suite (46 tests × desktop + mobile) incl. axe WCAG 2.1 AA checks – all passing

## Design decisions

- Display: Anybody (width axis animates the "tuning"), body: Schibsted Grotesk, mono: DM Mono
- Palette: ink `#0c1312`, paper `#f5f4ef`, amber `#fcb415`
- Intro plays once per session, only on the homepage, never blocks interaction; failsafe un-hides content after 2.6 s
- Page-hero entrances are CSS-only (no JS dependency); below-fold reveals via IntersectionObserver
- No invented stats/testimonials; dated facts phrased with their year

## Known issues / open questions

See "Flagged for verification" in `docs/CONTENT_SOURCES.md` (Fronius level, Motiva validity,
Allente wording, people's names, the crane photo's client).

## Next recommended action

Verify live deployment; then customer review of flagged content.
