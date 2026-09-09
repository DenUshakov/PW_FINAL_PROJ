import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('authenticate', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
  await homePage.goto();
  await homePage.header.goToSignIn();

  await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('/account');
  await expect(page.getByTestId('page-title')).toHaveText('My account');

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  await page.context().storageState({ path: authFile });
});