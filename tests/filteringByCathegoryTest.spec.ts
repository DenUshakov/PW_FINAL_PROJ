import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PowerTools } from '../constants/categories.enum';

test('Verify user can filter products by category', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();

  const categoryToSelect = PowerTools.SANDER;

  await homePage.selectCategory(categoryToSelect);

  const firstProduct = homePage.productTitles.first();
  await expect(firstProduct).toContainText(categoryToSelect, { ignoreCase: true });

  const titles = await homePage.productTitles.allInnerTexts();

  expect(titles.length).toBeGreaterThan(0);

  for (const title of titles) {
    expect(title.toLowerCase()).toContain(categoryToSelect.toLowerCase());
  }
});