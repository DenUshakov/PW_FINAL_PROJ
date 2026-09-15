import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
emailField: Locator;
submitButton: Locator;
passwordField: Locator;
    constructor(page: Page) {
        super(page);
        this.emailField = page.getByTestId('email');
        this.passwordField = page.getByTestId('password');
        this.submitButton = page.getByTestId('login-submit');
    }
  async login(email: string, password: string): Promise<void> {
  await this.emailField.fill(email);
  await this.passwordField.fill(password);
  await this.submitButton.click();
  }
}