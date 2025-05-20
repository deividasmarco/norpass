// playwright.config.js
/**
 * @type {import('@playwright/test').PlaywrightTestConfig}
 */
const config = {
  testDir: 'tests',
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
};
module.exports = config;
