/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export interface BillingAddressData {
  country: string;
  postcode: string;
  houseNumber: string; // Делаем обязательным
  street: string;
  city: string;
  state: string;
}

export interface PaymentDetailsData {
  method: string;
  cardNumber: string;
  expirationDate?: string;
  cvv: string;
  cardHolder: string;
}

export class CheckoutPage extends BasePage {
   proceedToCheckoutButton: Locator;
   proceedToBillingButton: Locator; 
   proceedToPaymentButton: Locator; 

   countrySelect: Locator;
   postcodeInput: Locator;
   houseNumberInput: Locator;
   streetInput: Locator;
   cityInput: Locator;
   stateInput: Locator;

   paymentMethodSelect: Locator;
   cardNumberInput: Locator;
   expirationDateInput: Locator;
   cvvInput: Locator;
   cardHolderNameInput: Locator;
   confirmButton: Locator;
   successAlert: Locator;

  constructor(page: Page) {
    super(page);

    this.proceedToCheckoutButton = page.getByTestId('proceed-1');
    this.proceedToBillingButton = page.getByTestId('proceed-2');
    this.proceedToPaymentButton = page.getByTestId('proceed-3');

    this.countrySelect = page.getByTestId('country');
    this.postcodeInput = page.getByTestId('postcode').or(page.getByTestId('postal_code'));
    this.houseNumberInput = page.getByTestId('house_number').or(page.getByTestId('street_number')).or(page.locator('input[formcontrolname="house_number"]'));
    this.streetInput = page.getByTestId('street').or(page.getByTestId('address'));
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');

    this.paymentMethodSelect = page.getByTestId('payment-method');
    this.cardNumberInput = page.getByTestId('credit_card_number');
    this.expirationDateInput = page.getByTestId('expiration_date');
    this.cvvInput = page.getByTestId('cvv');
    this.cardHolderNameInput = page.getByTestId('card_holder_name');
    this.confirmButton = page.getByTestId('finish');
    this.successAlert = page.locator('.alert-success').or(page.getByTestId('payment-success'));
  }

  getFutureExpirationDate(monthsAhead: number = 3): string {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + monthsAhead);

    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = String(currentDate.getFullYear());
    return `${month}/${year}`;
  }

  async fillBillingAddress(data: BillingAddressData) {

    await this.countrySelect.waitFor({ state: 'visible', timeout: 10000 });
    await this.countrySelect.selectOption({ label: data.country }).catch(async () => {
      await this.countrySelect.selectOption(data.country);
    });
    await this.postcodeInput.fill(data.postcode);
    
    if (await this.houseNumberInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.houseNumberInput.first().fill(data.houseNumber);
    }
    
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);

    await expect(this.proceedToPaymentButton).toBeEnabled({ timeout: 5000 });
    await this.proceedToPaymentButton.click();
  }

  async fillPaymentDetails(data: PaymentDetailsData) {
    await this.paymentMethodSelect.waitFor({ state: 'visible', timeout: 10000 });
    await this.paymentMethodSelect.selectOption(data.method);

    await this.cardNumberInput.fill(data.cardNumber);

    const expDate = data.expirationDate ?? this.getFutureExpirationDate(3);
    await this.expirationDateInput.fill(expDate);

    await this.cvvInput.fill(data.cvv);
    await this.cardHolderNameInput.fill(data.cardHolder);

    await expect(this.confirmButton).toBeEnabled({ timeout: 5000 });
    await this.confirmButton.click();
  }
}