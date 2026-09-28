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

  await expect(async () => {
    if (!(await loggedInApp.checkoutPage.countrySelect.isVisible())) {
      await loggedInApp.checkoutPage.proceedToBillingButton.click();
    }
    await expect(loggedInApp.checkoutPage.countrySelect).toBeVisible();
  }).toPass({ timeout: 15000 });

  await loggedInApp.checkoutPage.fillBillingAddress({
    country: 'Spain',
    postcode: '29001',
    houseNumber: '12', 
    street: 'Main Street',
    city: 'Malaga',
    state: 'Andalusia',
  });

  await loggedInApp.checkoutPage.fillPaymentDetails({
    method: 'credit-card',
    cardNumber: '1111-1111-1111-1111',
    cvv: '111',
    cardHolder: 'Jane Doe',
  });

  await expect(loggedInApp.checkoutPage.successAlert).toBeVisible({ timeout: 10000 });
});