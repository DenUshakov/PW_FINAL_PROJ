import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';
import { getFutureExpirationDate } from '../utils/date.utils';

export interface BillingAddressData {
  country: string;
  postcode: string;
  houseNumber: string;
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
  readonly proceedToCheckoutButton: Locator;
  readonly proceedToBillingButton: Locator; 
  readonly proceedToPaymentButton: Locator; 
  readonly table: Locator;
  readonly tableRows: Locator;
  readonly productTitle: Locator;
  readonly proceedButton: Locator;

  readonly countrySelect: Locator;
  readonly postcodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;

  readonly paymentMethodSelect: Locator;
  readonly cardNumberInput: Locator;
  readonly expirationDateInput: Locator;
  readonly cvvInput: Locator;
  readonly cardHolderNameInput: Locator;
  readonly confirmButton: Locator;
  readonly successAlert: Locator;

  constructor(page: Page) {
    super(page);

    this.proceedToCheckoutButton = page.getByTestId('proceed-1');
    this.proceedToBillingButton = page.getByTestId('proceed-2');
    this.proceedToPaymentButton = page.getByTestId('proceed-3');
    this.proceedButton = page.getByTestId('proceed-1');
    this.table = page.locator('table');
    this.tableRows = page.locator('tbody tr');
    this.productTitle = page.getByTestId('product-title');

    this.countrySelect = page.getByTestId('country');
    // В оригінальному додатку використовується postal_code
    this.postcodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');

    this.paymentMethodSelect = page.getByTestId('payment-method');
    this.cardNumberInput = page.getByTestId('credit_card_number');
    this.expirationDateInput = page.getByTestId('expiration_date');
    this.cvvInput = page.getByTestId('cvv');
    this.cardHolderNameInput = page.getByTestId('card_holder_name');
    this.confirmButton = page.getByTestId('finish');
    this.successAlert = page.getByText('Thanks for your order!');
  }

  async fillBillingAddress(data: BillingAddressData) {
    // Чекаємо завантаження та відображення першого поля адресної форми
    await this.countrySelect.waitFor({ state: 'visible' });

    await this.countrySelect.selectOption(data.country);
    if (!data.country) {
        throw new Error('Country value is missing in the provided data');
      }
    await this.postcodeInput.fill(data.postcode);
    await this.houseNumberInput.fill(data.houseNumber);
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.stateInput.press('Tab');
    await expect(this.proceedToPaymentButton).toBeEnabled();
    await this.proceedToPaymentButton.click();
  }

  async fillPaymentDetails(data: PaymentDetailsData) {
    await this.paymentMethodSelect.waitFor({ state: 'visible' });
    await this.paymentMethodSelect.selectOption(data.method);
    await this.cardNumberInput.fill(data.cardNumber);
  
    const expDate = data.expirationDate ?? getFutureExpirationDate(3);
    await this.expirationDateInput.fill(expDate);
  
    await this.cvvInput.fill(data.cvv);
    await this.cardHolderNameInput.fill(data.cardHolder);
  
    // 1. Клік для перевірки даних картки ("Check payment" / первинний submit)
    await expect(this.confirmButton).toBeEnabled();
    await this.confirmButton.click();
  
    // 2. Чекаємо появу плашки про успішний платіж
    await this.page.getByText('Payment was successful').waitFor({ state: 'visible' });
  
    // 3. Другий клік по кнопці "Confirm" для фінального підтвердження замовлення
    const confirmFinalBtn = this.page.getByRole('button', { name: 'Confirm' });
    await confirmFinalBtn.waitFor({ state: 'visible' });
    await confirmFinalBtn.click();
  }
}