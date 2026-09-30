import { test, expect } from '../fixture';

test('Verify successful checkout flow for logged in user', async ({ loggedInApp }) => {
  await loggedInApp.homePage.goto();

  const expectedTitle = (await loggedInApp.homePage.productTitles.first().innerText()).trim();
  const expectedPrice = (await loggedInApp.homePage.productPrices.first().innerText()).trim();

  await loggedInApp.homePage.clickOnProduct(expectedTitle);
  await loggedInApp.productDetailPage.addToCart();

  await loggedInApp.homePage.header.goToCart();
  await expect(loggedInApp.cartPage.productName).toHaveText(expectedTitle);
  await expect(loggedInApp.cartPage.productPrice).toHaveText(expectedPrice);

  await loggedInApp.cartPage.proceedToCheckout();

  // Перевірка та перехід до кроку адреси
  if (!(await loggedInApp.checkoutPage.countrySelect.isVisible())) {
    await loggedInApp.checkoutPage.proceedToBillingButton.click();
  }

  await expect(loggedInApp.checkoutPage.countrySelect).toBeVisible({ timeout: 15000 });

  // Заповнення адреси (Клік proceedToPaymentButton відбувається ВСЕРЕДИНІ цього методу)
  await loggedInApp.checkoutPage.fillBillingAddress({
    country: 'Spain',
    postcode: '28001',
    houseNumber: '10',
    street: 'Gran Via',
    city: 'Madrid',
    state: 'Madrid',
  });

  // Оплачуємо замовлення (fillPaymentDetails сам обробить платіж і клікне Confirm)
  await loggedInApp.checkoutPage.fillPaymentDetails({
    method: 'Credit Card',
    cardNumber: '1111-2222-3333-4444',
    cvv: '123',
    cardHolder: 'Denys QA',
  });

  // Перевірка успішного завершення
  await expect(loggedInApp.checkoutPage.successAlert).toBeVisible();
});