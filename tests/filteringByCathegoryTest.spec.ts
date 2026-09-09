import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { PowerTools } from '../pages/enums/categories.enum';

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto();
  
    const categoryToSelect = PowerTools.SANDER;
  
    await page.getByRole('checkbox', { name: categoryToSelect }).check();
  
    const firstProduct = page.getByTestId('product-name').first();
    await expect(firstProduct).toContainText(categoryToSelect, { ignoreCase: true });
  
    const productTitles = await page.getByTestId('product-name').allInnerTexts();
  
    expect(productTitles.length).toBeGreaterThan(0);
  
    for (const title of productTitles) {
      expect(title.toLowerCase()).toContain(categoryToSelect.toLowerCase());
    }
  });