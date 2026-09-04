import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

test('Login with valid credentials', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  
  await homePage.goto();
  await homePage.header.goToSignIn();

  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
  
  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(accountPage.header.navMenu).toContainText('Jane Doe');
});