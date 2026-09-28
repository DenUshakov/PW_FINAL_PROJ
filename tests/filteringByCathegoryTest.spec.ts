import { test, expect } from '../fixture';
import { PowerTools } from '../constants/categories.enum';

test('Verify user can filter products by category', async ({ app }) => {
  await app.homePage.goto();

  const categoryToSelect = PowerTools.SANDER;

  await app.homePage.selectCategory(categoryToSelect);

  const firstProduct = app.homePage.productTitles.first();
  await expect(firstProduct).toContainText(categoryToSelect, { ignoreCase: true });

  const titles = await app.homePage.productTitles.allInnerTexts();
  expect(titles.length).toBeGreaterThan(0);

  for (const title of titles) {
    expect(title.toLowerCase()).toContain(categoryToSelect.toLowerCase());
  }
});