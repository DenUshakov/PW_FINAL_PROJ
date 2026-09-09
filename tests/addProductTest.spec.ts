import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CheckoutPage } from '../pages/checkout.page';

test('Verify user can add product to cart', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductDetailPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Open homepage
  await homePage.goto();

  // 2. Click on product "Slip Joint Pliers"
  await homePage.clickOnProduct('Slip Joint Pliers');

  // Assertions for product page
  await expect(page).toHaveURL(/product/);
  await expect(productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(productPage.productPrice).toHaveText('9.17');

  // 3. Click Add to Cart
  await productPage.clickAddToCart();

  // Assertions for alert message
  await expect(productPage.alertMessage).toBeVisible();
  await expect(productPage.alertMessage).toContainText('Product added to shopping cart');
  await expect(productPage.alertMessage).toBeHidden({ timeout: 9000 });

  // Navigation assertion
  await expect(productPage.header.cartQuantity).toHaveText('1');

  // 4. Click on cart icon
  await productPage.header.clickCart();

  // Assertions for checkout page
  await expect(page).toHaveURL(/checkout/);
  await expect(checkoutPage.tableRows).toHaveCount(1);
  await expect(checkoutPage.productTitle).toHaveText('Slip Joint Pliers');
  await expect(checkoutPage.proceedButton).toBeVisible();
});