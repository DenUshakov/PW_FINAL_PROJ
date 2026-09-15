import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);

  await homePage.goto();
  await homePage.header.goToSignIn();

  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(accountPage.pageTitle).toBeVisible();
  await expect(accountPage.pageTitle).toHaveText('My account');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  await page.context().storageState({ path: authFile });
});