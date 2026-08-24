import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto(process.env.WEB_URL as string);
  await page.getByText('Combination Pliers').click();
  await expect(page.locator('[data-test="product-name"]'))
  .toHaveText('Combination Pliers');
  await expect(page).toHaveURL(/\/product\//);
  await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
});