# Redesign analysis & improvements – Joensuun Telemaailma Oy

## The business in one paragraph

A Joensuu electronics company founded in 1977 as a TV-repair shop. Today it runs
four quite different lines from one shop on the Salpakangas industrial estate:
(1) **SolarWorks** solar power – design, sales, installation, inspections and
test measurements; (2) **antenna and data-network contracting** for homes and
housing companies across Eastern Finland; (3) **vehicle and work-machine
installations** (tracking, VHF/LA radios, vehicle computers) incl. forestry
machines, as installation partner of Harvestia, Metsä Group, Stora Enso and UPM;
(4) a **shop** for phones, rugged devices, IT, accessories, dog trackers and
trail cameras for hunters.

## Weaknesses of the current site (telemaailma.com, Visma website builder)

| Area | Finding |
|---|---|
| First impression | Generic builder theme. The first thing a visitor sees is a year-old "Black Week 24.–30.11.2025" Burrel banner. No logo – the header is the text "Joensuun Telemaailma Oy / SolarWorks.fi". Favicon is a generic globe. |
| Brand identity | Two brands (Telemaailma + SolarWorks) with no visual relationship. The strong SolarWorks logo lives only in a 300 px banner. |
| Information architecture | The whole product catalogue (`/tuotteet` + 4 sub-pages) is **hidden from the menu** – reachable only via sitemap.xml. One "Tuotevalikoima" link and the "Latausasemat" page return "Sivua ei löydy". "Kassalle" (checkout) appears in the nav without a shop. |
| Service presentation | Vehicle installations, forestry partnerships and the full-trailer-accessible yard – real differentiators – are buried in one paragraph. Antenna services are a plain bullet list. Solar has two sentences and an external calculator link. |
| Trust | Valuable credentials (SETI A/T/AT, SANT, Fronius, Motiva, forestry partners, 1977) are not surfaced. The only project photo the company has (rooftop crane shot) and its measurement report exist only on the abandoned solarworks.fi site. |
| Conversion | No call-to-action anywhere except "Tule käymään tai soita". The contact form sits under "Tietoa meistä"; emails are obfuscated as "huolto @ telemaailma . com". No service-specific inquiry. |
| Mobile | Builder theme with small type and no prominent call button. |
| Local SEO | Titles like "Etusivu"; no structured data; service area mentioned once in a long paragraph. solarworks.fi 301-redirects to the homepage instead of the solar page. |
| Accessibility | Generic link texts, images without useful alt text, low-contrast theme elements. |

## Creative direction – "Kenttä"

*Kenttä* means both signal **field strength** ("onko kenttää?") and the **field/terrain**.
Everything this company does is about capturing something from the sky – TV and
satellite signals, 4G, GPS positions for dogs and machines, and sunlight.
Hence the headline **"Taivaalta talteen."** (captured from the sky).

* **Signature arc** – the crescent from the authentic SolarWorks logo becomes the
  whole site's graphic language: a tuning dial in the hero, the horizon edge of every
  page hero, the delivery-process timeline, the favicon, and a unifying mark above
  the new Telemaailma wordmark (proposal – the company has no logo today).
* **Instrument aesthetic** – mono readouts, tick marks, a radar, an IV-curve report,
  a test card on the 404 page: a nod to the TV-repair origins and to measuring work.
* **Palette** – night-spruce ink `#0c1312`, winter paper `#f5f4ef`, SolarWorks amber
  `#fcb415` (sampled from the original logo).
* **Type** – Anybody (variable *width* axis, used for "tuning-in" motion), Schibsted
  Grotesk for reading, DM Mono for readouts. All with full Finnish support.

## Improvements and their business value

| # | Improvement | Business benefit |
|---|---|---|
| 1 | **Homepage tuner** (signature): the SolarWorks arc as an analog dial; on the first visit the sun-dot sweeps across five "channels" and locks on SolarWorks; visitors can drag it, click labels or use accessible tabs | Explains a multi-line business in one interaction instead of a confusing menu; memorable; makes SolarWorks the lead offer |
| 2 | Clear architecture: Aurinkosähkö · Antennit · Ajoneuvot · Maasto · Myymälä · Yritys, + `/palvelut` hub; the hidden product pages are surfaced | Every customer segment (homeowner, housing company, forestry contractor, hunter, business buyer) finds its page in one click |
| 3 | **SolarWorks page** with process, real project photo, real IV-curve report, Fronius after-sales, FAQ, yield-calculator link | Positions SolarWorks as the measurement-competent expert – a differentiator against pure installers |
| 4 | **Sun-path explorer** (physically computed for 62.6° N) | Educates buyers about Finnish solar seasons honestly, without fabricated yield figures |
| 5 | **Antenna page** with service groups, property types, "kuva poikki?" fault CTA and a **coverage radar** (real bearings/distances to the towns the company names) | Captures urgent repair calls and housing-company leads; local relevance for SEO |
| 6 | **Vehicle page** promoting forestry partners and the full-trailer-accessible yard | Turns hidden B2B credibility into a sales argument for fleet and forestry customers |
| 7 | **Metsästys ja maasto** page (brand-led: Ultracom, Tracker, Garmin, Burrel, Reolink), annual-service window, 18650 battery expertise | Seasonal service bookings before the autumn rush; expertise content hunters share |
| 8 | **Topic-adaptive inquiry form** (`?aihe=` preselect from every CTA; roof type, vehicle type etc.) | Better-qualified leads, fewer callbacks |
| 9 | Credentials surfaced site-wide; live open/closed badge; phone in header & footer; click-to-call | Trust and faster contact, especially on mobile |
| 10 | Prerendered pages, unique titles/descriptions, JSON-LD (ElectronicsStore + SolarWorks department + breadcrumbs), sitemap | Local SEO foundation ("aurinkopaneelit Joensuu", "antenniasennus Joensuu") – activated after approval |
| 11 | WCAG 2.1 AA work: semantic landmarks, keyboard tabs, focus states, reduced motion, accessible form errors | Usable for everyone; meets public-sector-adjacent customers' expectations |

## Production migration notes

* Redirect old URLs: `/etusivu` → `/`, `/tuotteet/puhelimet|tarvikkeet` → `/tuotteet#…`,
  `/tuotteet/paikannuslaitteet` → `/tuotteet/metsastys-ja-maasto#paikannuslaitteet`,
  `/tuotteet/riista--ja-valvontakamerat` → `…#riistakamerat`, and point **solarworks.fi → /aurinkosahko**.
* The current site serves HTTPS correctly; keep HSTS and certificates in place when moving hosting.
  The demo's HTTPS does not change the production site.
