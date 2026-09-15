import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/account.page';

test('Login with valid credentials', async ({ page }) => {
  const accountPage = new AccountPage(page);
  
  await page.goto('/account');
  
  await expect(page).toHaveURL('/account');
  
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(accountPage.header.navMenu).toContainText('Jane Doe');
});