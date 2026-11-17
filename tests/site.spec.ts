import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const BASE = '/telemaailma-demo'
const go = (page: Page, path: string) => page.goto(BASE + path)

const routes = [
  { path: '/', h1: /Taivaalta/ },
  { path: '/aurinkosahko/', h1: /Aurinkosähkö/ },
  { path: '/palvelut/', h1: /Suunnittelemme/ },
  { path: '/palvelut/antenniasennukset/', h1: /Kaikki kanavat/ },
  { path: '/palvelut/ajoneuvoasennukset/', h1: /Autoon, koneeseen/ },
  { path: '/tuotteet/', h1: /Laitteet arkeen/ },
  { path: '/tuotteet/metsastys-ja-maasto/', h1: /Koira pysyy/ },
  { path: '/tietoa-meista/', h1: /Vuodesta/ },
  { path: '/yhteystiedot/', h1: /Soita, tule/ },
]

function collectErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })
  return errors
}

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1280

test.describe('pages', () => {
  for (const r of routes) {
    test(`renders ${r.path} directly without errors or overflow`, async ({ page }) => {
      const errors = collectErrors(page)
      const res = await go(page, r.path)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveText(r.h1)
      await expect(page).toHaveTitle(/Telemaailma/)
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
      await page.waitForTimeout(400)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })
  }

  test('unknown URL shows the branded 404', async ({ page }) => {
    const res = await go(page, '/tata-ei-ole/')
    expect(res?.status()).toBe(404)
    await expect(page.locator('h1')).toHaveText('Ei signaalia.')
    await page.getByRole('link', { name: 'Etusivulle' }).click()
    await expect(page.locator('h1')).toHaveText(/Taivaalta/)
  })

  test('all internal links resolve', async ({ page, request }) => {
    const seen = new Set<string>()
    for (const r of routes) {
      await go(page, r.path)
      const hrefs = await page.$$eval('a[href^="/telemaailma-demo"]', (as) => as.map((a) => a.getAttribute('href')!))
      hrefs.forEach((h) => seen.add(h.split('#')[0].split('?')[0]))
    }
    for (const h of seen) {
      const res = await request.get(h.endsWith('/') ? h : h + '/')
      expect(res.status(), h).toBe(200)
    }
  })
})

test.describe('navigation & scroll', () => {
  test('main navigation opens the destination at the top', async ({ page }) => {
    await go(page, '/')
    await page.mouse.wheel(0, 2400)
    await page.waitForTimeout(400)
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(1000)
    if (isMobile(page)) {
      await page.getByRole('button', { name: 'Valikko' }).click()
      const dialog = page.getByRole('dialog', { name: 'Valikko' })
      await expect(dialog).toBeVisible()
      await dialog.getByRole('link', { name: /Antennit/ }).click()
      await expect(dialog).toBeHidden()
    } else {
      await page.getByRole('navigation', { name: 'Päävalikko' }).getByRole('link', { name: 'Antennit' }).click()
    }
    await expect(page).toHaveURL(/antenniasennukset/)
    await expect(page.locator('h1')).toHaveText(/Kaikki kanavat/)
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
  })

  test('back button restores the previous scroll position', async ({ page }) => {
    await go(page, '/')
    const link = page.locator('#main a[href$="/palvelut/ajoneuvoasennukset"]:visible').last()
    await link.scrollIntoViewIfNeeded()
    await page.waitForTimeout(400)
    const before = await page.evaluate(() => window.scrollY)
    expect(before).toBeGreaterThan(800)
    // Activate the link in place (Playwright's click() would re-centre it first).
    await link.evaluate((el) => (el as HTMLAnchorElement).click())
    await expect(page.locator('h1')).toHaveText(/Autoon/)
    expect(await page.evaluate(() => window.scrollY)).toBe(0)
    await page.goBack()
    await expect(page.locator('h1')).toHaveText(/Taivaalta/)
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before - 10)
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - before)).toBeLessThan(10)
  })

  test('in-page anchor links jump to their section', async ({ page }) => {
    await go(page, '/tuotteet/')
    await page.getByRole('navigation', { name: 'Tuoteryhmät' }).getByRole('link', { name: 'Tarvikkeet' }).click()
    await expect(page).toHaveURL(/#tarvikkeet/)
    await expect(page.locator('#tarvikkeet h2')).toBeInViewport()
  })
})

test.describe('signature tuner', () => {
  test('channels switch via tabs and arrow keys', async ({ page }) => {
    await go(page, '/')
    const tabs = page.getByRole('tablist', { name: 'Viritä palveluun' })
    await tabs.getByRole('tab', { name: /Ajoneuvot/ }).click()
    await expect(page.getByRole('tabpanel')).toContainText('Ajoneuvo')
    await page.keyboard.press('ArrowRight')
    await expect(tabs.getByRole('tab', { name: /Maasto/ })).toHaveAttribute('aria-selected', 'true')
    await expect(tabs.getByRole('tab', { name: /Maasto/ })).toBeFocused()
    await expect(page.getByRole('tabpanel')).toContainText('Metsästys ja maasto')
  })

  test('intro plays once per session and content stays reachable', async ({ page }) => {
    await go(page, '/')
    await expect(page.getByRole('link', { name: 'Pyydä tarjous' })).toBeVisible({ timeout: 4000 })
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem('tm-intro'))).toBe('1')
    await page.reload()
    const cls = await page.evaluate(() => document.documentElement.className)
    expect(cls).not.toContain('intro')
  })
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('hero is fully visible immediately', async ({ page }) => {
    await go(page, '/')
    const cls = await page.evaluate(() => document.documentElement.className)
    expect(cls).not.toContain('motion')
    const opacity = await page.locator('#hero-title').evaluate((el) => getComputedStyle(el).opacity)
    expect(opacity).toBe('1')
  })
})

test.describe('inquiry form (demo)', () => {
  test('validates and never sends', async ({ page }) => {
    const external: string[] = []
    page.on('request', (r) => {
      if (!r.url().startsWith('http://127.0.0.1:4173')) external.push(r.url())
    })
    await go(page, '/yhteystiedot/?aihe=aurinkosahko')
    await expect(page.getByRole('radio', { name: 'Aurinkosähkö' })).toBeChecked()
    await expect(page.getByLabel(/Asennuspaikka/)).toBeVisible()

    await page.getByRole('button', { name: /Lähetä viesti/ }).click()
    const alert = page.getByRole('alert')
    await expect(alert).toContainText('Kirjoita nimesi')
    await expect(alert).toContainText('sähköpostiosoite tai puhelinnumero')
    await expect(page.getByLabel(/^Nimi/)).toHaveAttribute('aria-invalid', 'true')

    await page.getByLabel(/^Nimi/).fill('Testi Henkilö')
    await page.getByLabel(/^Sähköposti/).fill('testi@example.com')
    await page.getByLabel(/^Viesti/).fill('Haluaisin tarjouksen aurinkosähköjärjestelmästä.')
    await page.getByRole('button', { name: /Lähetä viesti/ }).click()
    await expect(page.getByRole('status')).toContainText('Demoversio – viestiä ei lähetetty.')
    expect(external).toEqual([])
  })
})

test.describe('accessibility', () => {
  for (const path of ['/', '/aurinkosahko/', '/palvelut/antenniasennukset/', '/yhteystiedot/', '/tuotteet/metsastys-ja-maasto/']) {
    test(`no serious axe violations on ${path}`, async ({ page }) => {
      await go(page, path)
      await page.waitForTimeout(2800)
      // Reveal everything so contrast is evaluated on final states.
      await page.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in')))
      await page.waitForTimeout(1500)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([])
    })
  }
})
