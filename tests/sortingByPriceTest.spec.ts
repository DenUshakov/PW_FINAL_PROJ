import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const priceSortData = [
  { testTitle: 'Low - High', sortOption: 'price,asc', isAscending: true },
  { testTitle: 'High - Low', sortOption: 'price,desc', isAscending: false },
];

for (const data of priceSortData) {
  test(`Verify sorting by price (${data.testTitle})`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.selectSort(data.sortOption);
    await expect(async () => {
      const priceTexts = await page.getByTestId('product-price').allInnerTexts();
      expect(priceTexts.length).toBeGreaterThan(0);

      const prices = priceTexts.map((text) => Number(text.replace('$', '').trim()));

      for (let i = 0; i < prices.length - 1; i++) {
        if (data.isAscending) {
          expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        } else {
          expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
      }
    }).toPass();
  });
}