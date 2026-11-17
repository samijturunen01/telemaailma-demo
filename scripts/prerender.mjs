/**
 * Prerenders every route to static HTML with page-specific metadata, so each
 * URL works on GitHub Pages without SPA redirects and has meaningful HTML for
 * crawlers and link previews. The branded 404 is written to dist/404.html.
 *
 * Indexing stays disabled unless VITE_ALLOW_INDEXING=true (production only,
 * after customer approval).
 */
import { createServer } from 'vite'
import fs from 'node:fs/promises'
import path from 'node:path'

const base = process.env.VITE_BASE_PATH || '/telemaailma-demo/'
const site = (process.env.SITE_URL || 'https://samijturunen01.github.io/telemaailma-demo/').replace(/\/?$/, '/')
const allowIndexing = process.env.VITE_ALLOW_INDEXING === 'true'

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

try {
  const { render, routes, company } = await server.ssrLoadModule('/src/entry-server.tsx')
  const template = await fs.readFile('dist/index.html', 'utf8')

  const business = {
    '@context': 'https://schema.org',
    '@type': 'ElectronicsStore',
    '@id': `${site}#yritys`,
    name: company.legalName,
    alternateName: ['Telemaailma', 'SolarWorks'],
    url: site,
    image: `${site}images/og-telemaailma.jpg`,
    telephone: '+358136100700',
    email: company.emails.map((e) => e.address),
    foundingDate: String(company.founded),
    identifier: { '@type': 'PropertyValue', propertyID: 'Y-tunnus', value: company.businessId },
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: 'FI',
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lon },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    areaServed: ['Joensuu', 'Kontiolahti', 'Liperi', 'Ilomantsi', 'Tohmajärvi', 'Rääkkylä', 'Itä-Suomi'],
    department: {
      '@type': 'Organization',
      name: 'SolarWorks',
      description: 'Aurinkosähköjärjestelmien suunnittelu, myynti, asennus, tarkastukset ja testimittaukset.',
    },
  }

  const pages = []
  for (const meta of routes) {
    const route = meta.path
    const body = render(route, base)
    const url = route === '/' || route === '/404' ? site : `${site}${route.slice(1)}/`

    const crumbs =
      route === '/' || route === '/404'
        ? null
        : {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Etusivu', item: site },
              ...route
                .slice(1)
                .split('/')
                .map((_, i, parts) => {
                  const p = '/' + parts.slice(0, i + 1).join('/')
                  const m = routes.find((r) => r.path === p)
                  return { '@type': 'ListItem', position: i + 2, name: m ? m.label : parts[i], item: `${site}${p.slice(1)}/` }
                }),
            ],
          }

    const head = [
      `<title>${esc(meta.title)}</title>`,
      `<meta name="description" content="${esc(meta.description)}" />`,
      route === '/404' ? '' : `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:locale" content="fi_FI" />`,
      `<meta property="og:site_name" content="Joensuun Telemaailma" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${site}images/og-telemaailma.jpg" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:alt" content="Aurinkopaneeleja nostetaan lumiselle katolle." />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<script type="application/ld+json">${JSON.stringify(business)}</script>`,
      crumbs ? `<script type="application/ld+json">${JSON.stringify(crumbs)}</script>` : '',
    ]
      .filter(Boolean)
      .join('\n    ')

    let html = template
      .replace(/<title>[\s\S]*?<\/title>/, '')
      .replace(/<meta name="description"[^>]*>/, '')
      .replace('</head>', `    ${head}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)

    if (allowIndexing && route !== '/404') {
      html = html.replace('<meta name="robots" content="noindex, nofollow" />', '<meta name="robots" content="index, follow" />')
    }

    const out = route === '/404' ? 'dist/404.html' : path.join('dist', route, 'index.html')
    await fs.mkdir(path.dirname(out), { recursive: true })
    await fs.writeFile(out, html)
    pages.push(route)
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => r.path !== '/404')
  .map((r) => `  <url><loc>${r.path === '/' ? site : `${site}${r.path.slice(1)}/`}</loc></url>`)
  .join('\n')}
</urlset>
`
  await fs.writeFile('dist/sitemap.xml', sitemap)
  await fs.writeFile(
    'dist/robots.txt',
    allowIndexing
      ? `User-agent: *\nAllow: /\n\nSitemap: ${site}sitemap.xml\n`
      : 'User-agent: *\nDisallow: /\n\n# Hades Design concept demo – not the official website. Do not index.\n',
  )
  await fs.writeFile('dist/.nojekyll', '')
  console.log(`Prerendered ${pages.length} routes (incl. 404.html). Indexing ${allowIndexing ? 'ENABLED' : 'disabled'}.`)
} finally {
  await server.close()
}
