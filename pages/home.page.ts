import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly sortDropdown: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;

  constructor(page: Page) {
    super(page);
    this.sortDropdown = page.getByTestId('sort');
    this.productTitles = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickOnProduct(productName: string) {
    await this.page.getByRole('heading', { name: productName }).click();
  }

  async selectSort(optionValue: string) {
    const responsePromise = this.page.waitForResponse(
      (response) => response.url().includes('/products') && response.status() === 200
    );
    await this.sortDropdown.selectOption(optionValue);
    await responsePromise;
  }

  async selectCategory(categoryName: string) {
    await this.page.getByLabel(categoryName).check();
    await this.page.locator('[data-test="filter_completed"]').waitFor({ state: 'attached' }).catch(() => {});
  }
}