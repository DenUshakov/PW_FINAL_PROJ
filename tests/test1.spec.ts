import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';

test('test', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await page.goto(process.env.WEB_URL + '/auth/login');
  await page.fill('#email', process.env.USER_EMAIL!);
  await page.fill('#password', process.env.USER_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('/account');
  await expect(page.locator('[data-test="page-title"]'))
  .toHaveText('My account');
  await expect(page.locator('[data-test="nav-menu"]')).toHaveText(process.env.USER_NAME as string);

});