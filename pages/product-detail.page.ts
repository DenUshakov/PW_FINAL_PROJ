import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductDetailPage extends BasePage {
  productName: Locator;
  productPrice: Locator;
  addToCartButton: Locator;
  addToFavoritesButton: Locator;
  alertMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('unit-price');
    this.addToCartButton = page.getByTestId('add-to-cart');
    this.addToFavoritesButton = page.getByTestId('add-to-favorites');
    this.alertMessage = page.getByRole('alert');
  }
  async clickAddToCart() {
    await this.addToCartButton.click();
  }
}