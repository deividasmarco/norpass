require('dotenv').config();
const { test, expect } = require('@playwright/test');

const TEST_EMAIL     = process.env.TEST_EMAIL;
const FIRST_NAME     = 'Deividas';
const LAST_NAME      = 'Marcinkevicius';
const CARD_NUMBER    = '1234 5678 9123 4567';
const EXPIRY_DATE    = '05/20';
const CVC_CODE       = '123';
const POSTAL_CODE    = '14187';

test('Product purschase flow', async ({ page }) => {
  await page.goto('https://nordpass.com', { waitUntil: 'networkidle' });
  const accept = page.getByTestId('consent-widget-accept-all');
  if (await accept.isVisible()) await accept.click();
  await page.locator('#Hero').getByTestId('for-personal-in-na').scrollIntoViewIfNeeded();
  await page.locator('#Hero').getByTestId('for-personal-in-na').click({ force: true });
  await page.waitForURL('**/plans/**');

  const [checkout] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Purchase Now' }).first().click(),
  ]);
  await checkout.waitForLoadState('networkidle');


  await checkout.getByTestId('email-address-input').fill(TEST_EMAIL);
  await checkout.getByRole('textbox', { name: 'First name' }).fill(FIRST_NAME);
  await checkout.getByRole('textbox', { name: 'Last name' }).fill(LAST_NAME);
  await checkout.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await checkout.frameLocator('iframe[name^="cardNumber"]')
                .getByRole('textbox', { name: /0000 0000 0000/ })
                .fill(CARD_NUMBER);
  await checkout.frameLocator('iframe[name^="expiry"]')
                .getByRole('textbox', { name: /MM\/YY/ })
                .fill(EXPIRY_DATE);
  await checkout.frameLocator('iframe[name^="cvc"]')
                .getByRole('textbox', { name: /000/ })
                .fill(CVC_CODE);

  await checkout.getByRole('textbox', { name: 'Postal code' }).fill(POSTAL_CODE);
  await checkout.getByTestId('payment-form-submit-button').click();
});
