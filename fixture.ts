import { test as base } from '@playwright/test';
import { App } from './pages/app.pages';

type CustomFixtures = {
  app: App;
  loggedInApp: App;
};

export const test = base.extend<CustomFixtures>({
  app: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },

  loggedInApp: async ({ app }, use) => {
    await app.homePage.goto();

    const isSignInVisible = await app.homePage.header.signInLink.isVisible().catch(() => false);

    if (isSignInVisible) {
      await app.homePage.header.goToSignIn();
      await app.loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
      await app.page.waitForURL('**/account');
    }

    await use(app);
  },
});

export { expect } from '@playwright/test';