import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';

const nameSortData = [
  { testTitle: 'A - Z', sortOption: 'name,asc', isAscending: true },
  { testTitle: 'Z - A', sortOption: 'name,desc', isAscending: false },
];

for (const data of nameSortData) {
  test(`Verify sorting by name (${data.testTitle})`, async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await homePage.selectSort(data.sortOption);
    await expect(async () => {
      const productTitles = await page.getByTestId('product-name').allInnerTexts();
      expect(productTitles.length).toBeGreaterThan(0);

      for (let i = 0; i < productTitles.length - 1; i++) {
        const current = productTitles[i];
        const next = productTitles[i + 1];

        if (data.isAscending) {
          expect(current.localeCompare(next)).toBeLessThanOrEqual(0);
        } else {
          expect(current.localeCompare(next)).toBeGreaterThanOrEqual(0);
        }
      }
    }).toPass({ timeout: 5000 });
  });
}