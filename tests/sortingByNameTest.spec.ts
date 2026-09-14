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
      const titles = await homePage.productTitles.allInnerTexts();
      expect(titles.length).toBeGreaterThan(0);

      for (let i = 0; i < titles.length - 1; i++) {
        const comparison = titles[i].localeCompare(titles[i + 1]);
        if (data.isAscending) {
          expect(comparison).toBeLessThanOrEqual(0);
        } else {
          expect(comparison).toBeGreaterThanOrEqual(0);
        }
      }
    }).toPass();
  });
}