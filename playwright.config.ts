import { defineConfig, devices } from '@playwright/test'

/**
 * Tests run against the production build served like GitHub Pages
 * (run `npm run build` first). Base path: /telemaailma-demo/.
 */
export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node scripts/serve-dist.mjs 4173',
    url: 'http://127.0.0.1:4173/telemaailma-demo/',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
