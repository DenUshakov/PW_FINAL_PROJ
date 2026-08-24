import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto(process.env.WEB_URL as string);

  //Click on the product "Slip Joint Pliers".
  await page.locator('[data-test="product-name"]')
  .getByText('Slip Joint Pliers').click();
  //Verify URL contains https://practicesoftwaretesting.com/product.
  await expect(page).toHaveURL(/\/product\//);
  //Verify product name is "Slip Joint Pliers".
  await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
  //Verify product price is 9.17.
  await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');
  //"Add to Cart" button.
  await page.locator('[data-test="add-to-cart"]').click();
  //Verify alert message is visible.
  await expect(page.getByLabel('Product added to shopping')).toContainText('Product added to shopping cart.');
  // Verify alert disappears in 8 seconds.
  await expect(page.getByLabel('Product added to shopping')).not.toBeVisible({timeout: 8000});
  //Verify cart icon in navigation shows quantity = 1.
  await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
  //Click on the cart icon in the navigation.
  await page.locator('[data-test="nav-cart"]').click();
  //Verify URL is https://practicesoftwaretesting.com/checkout.
  await expect(page).toHaveURL('/checkout');
//   Verify the number of products in the cart table equals 1.
  await expect(page.locator('[data-test="product-quantity"]')).toHaveValue('1');
  //Verify product title in the cart is "Slip Joint Pliers".
  await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers');
//   Verify "Proceed to Checkout" button is visible.
  await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
});