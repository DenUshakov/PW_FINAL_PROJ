import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  readonly tableRows: Locator;
  readonly productTitle: Locator;
  readonly proceedButton: Locator;

  constructor(page: Page) {
    super(page);
    this.tableRows = page.locator('table tbody tr');
    this.productTitle = page.getByTestId('product-title');
    this.proceedButton = page.getByTestId('proceed-1');
  }
}