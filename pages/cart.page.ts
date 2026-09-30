import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly totalPrice: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId('product-title');
    this.productPrice = page.getByTestId('product-price');
    this.totalPrice = page.getByTestId('cart-total');
    this.proceedToCheckoutButton = page.getByTestId('proceed-1');
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}