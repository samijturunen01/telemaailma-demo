/**
 * Visual QA helper: screenshots routes at several viewports.
 * Usage: node scripts/capture.mjs <baseUrl> <outDir> [route,route] [vp,vp] [--full] [--intro]
 *   vp ∈ desktop | laptop | tablet | mobile
 */
import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const [base = 'http://127.0.0.1:5180/telemaailma-demo/', out = '.qa', routesArg, vpArg, ...flags] = process.argv.slice(2)
const routes = (routesArg || '/').split(',')
const vps = {
  desktop: { width: 1440, height: 900 },
  wide: { width: 1920, height: 1080 },
  laptop: { width: 1280, height: 720 },
  tablet: { width: 820, height: 1180 },
  mobile: { width: 390, height: 844 },
}
const chosen = (vpArg || 'desktop,mobile').split(',')
const full = flags.includes('--full')
const intro = flags.includes('--intro')

await fs.mkdir(out, { recursive: true })
const browser = await chromium.launch()
const errors = []
for (const vp of chosen) {
  const ctx = await browser.newContext({ viewport: vps[vp], deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  page.on('console', (m) => m.type() === 'error' && errors.push(`[${vp}] ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`[${vp}] ${e.message}`))
  for (const r of routes) {
    await page.goto(base.replace(/\/$/, '') + (r === '/' ? '/' : r), { waitUntil: 'networkidle' })
    if (!intro) await page.waitForTimeout(3200)
    else await page.waitForTimeout(Number(process.env.WAIT || 600))
    if (full) {
      // trigger reveals
      const h = await page.evaluate(() => document.body.scrollHeight)
      for (let y = 0; y < h; y += 500) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y)
        await page.waitForTimeout(120)
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(500)
    }
    const name = `${vp}${r.replace(/\//g, '_') || '_home'}${intro ? '-intro' + (process.env.WAIT || '') : ''}.png`
    await page.screenshot({ path: `${out}/${name}`, fullPage: full })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    if (overflow > 0) errors.push(`[${vp}] ${r} horizontal overflow ${overflow}px`)
    console.log('saved', name)
  }
  await ctx.close()
}
await browser.close()
if (errors.length) console.log('ISSUES:\n' + errors.join('\n'))
