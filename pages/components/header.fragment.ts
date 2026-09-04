import { Locator, Page } from '@playwright/test';

export class HeaderFragment {
  readonly page: Page;
  readonly homeLink: Locator;
  readonly signInLink: Locator;
  readonly navMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeLink = page.getByTestId('nav-home');
    this.signInLink = page.getByTestId('nav-sign-in');
    this.navMenu = page.getByTestId('nav-menu');
  }

  async goToSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async goToHome(): Promise<void> {
    await this.homeLink.click();
  }
}