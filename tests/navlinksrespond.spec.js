import { test, expect } from '@playwright/test';

test('All top-nav links respond with 200', async ({ page, request }) => {
  await page.goto('https://nordpass.com', { waitUntil: 'networkidle' });
  const accept = page.getByTestId('consent-widget-accept-all');
  if (await accept.isVisible({ timeout: 5_000 })) {
    await accept.click();
    await page.waitForSelector('[data-testid="consent-widget"]', { state: 'detached' });
  }
  const links = await page.$$eval(
    'header a[href^="http"]',
    els => Array.from(new Set(els.map(a => a.href)))
  );
  console.log('Header links:', links);
  const filtered = links.filter(url => url.includes('://nordpass.com'));
  console.log('Filtered links:', filtered);
  for (const url of filtered) {
    console.log('Checking:', url);
    const resp = await request.get(url);
    test.step(`GET ${url}`, () => {
      expect(resp.status(), `status for ${url}`).toBeLessThan(400);
    });
  }
});
