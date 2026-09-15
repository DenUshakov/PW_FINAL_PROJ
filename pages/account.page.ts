import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class AccountPage  extends BasePage {
  pageTitle: Locator;
  navMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByTestId('page-title');
    this.navMenu = page.getByTestId('nav-menu');
  }

  async assertPageLoaded(expectedTitle: string = 'My account'): Promise<void> {
    await expect(this.page).toHaveURL('/account');
    await expect(this.pageTitle).toHaveText(expectedTitle);
  }

  async assertUserLoggedIn(userName: string): Promise<void> {
    await expect(this.header.navMenu).toContainText(userName);
  }
}