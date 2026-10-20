import { defineConfig, devices } from "@playwright/test";

// Browser tests run against the committed production export (dist/) served by `vite preview`.
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "test-results/e2e.json" }]],
  use: { baseURL: "http://127.0.0.1:4173/", trace: "off", screenshot: "off" },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort --host 127.0.0.1",
    url: "http://127.0.0.1:4173/",
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "chromium-mobile", use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
    // WebKit needs host libraries (libgtk-4, libgraphene, libevent...). Opt in with W1_WEBKIT=1 where they exist.
    ...(process.env.W1_WEBKIT ? [{ name: "webkit-mobile", use: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 } } }] : []),
  ],
});
