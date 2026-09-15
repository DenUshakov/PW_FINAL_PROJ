import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  page: Page;
  homeLink: Locator;
  signInLink: Locator;
  navMenu: Locator;
  cartIcon: Locator;
  cartQuantity: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav-home');
    this.signInLink = page.getByTestId('nav-sign-in');
    this.navMenu = page.getByTestId('nav-menu');
    this.cartIcon = page.getByTestId('nav-cart');
    this.cartQuantity = page.getByTestId('cart-quantity');
  }

  async goToSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }

  async clickCart() {
    await this.cartIcon.click();
  }
}