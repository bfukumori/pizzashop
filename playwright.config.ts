import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './test',
  testMatch: '**/*.e2e.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:58789',
  },
  webServer: {
    command: 'pnpm dev:test',
    url: 'http://localhost:58789',
    reuseExistingServer: !process.env.CI,
  },
})
