import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailPage } from '../pages/product-detail.page';

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productDetailPage = new ProductDetailPage(page);

  // 1. Open homepage
  await homePage.goto();

  // 2. Click on the product "Combination Pliers"
  await homePage.clickOnProduct('Combination Pliers');

  // Assertions
  await expect(page).toHaveURL(/\/product\//);
  await expect(productDetailPage.productName).toHaveText('Combination Pliers');
  await expect(productDetailPage.productPrice).toHaveText('14.15');
  await expect(productDetailPage.addToCartButton).toBeVisible();
  await expect(productDetailPage.addToFavoritesButton).toBeVisible();
});