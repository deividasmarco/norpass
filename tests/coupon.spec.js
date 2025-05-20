import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const COUPON   = process.env.COUPON_CODE;
const DISCOUNT = process.env.DISCOUNT_PERCENT;

test('promo flow applies correct coupon and discount', async ({ page }) => {

  await page.goto('https://nordpass.com/', { waitUntil: 'networkidle' });
  const accept = page.getByTestId('consent-widget-accept-all');
  if (await accept.isVisible({ timeout: 5000 })) {
    await accept.click();
    await page.waitForSelector('[data-testid="consent-widget"]', { state: 'detached' });
  }
  const dealBtn = page.getByTestId('get-the-deal-in-business-sale-sticky-bar');
  await dealBtn.waitFor({ state: 'visible', timeout: 5000 });
  await dealBtn.click();
  const saveBadge = page.getByText(new RegExp(`Save ${DISCOUNT}%`));
  await saveBadge.scrollIntoViewIfNeeded();
  await saveBadge.click();
  const couponPill = page.getByTestId('applied-coupon');
  await expect(couponPill).toBeVisible();
  await expect(couponPill).toHaveText(COUPON);
  console.log("COUPON:", COUPON, "DISCOUNT:", DISCOUNT);
});
