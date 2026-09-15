import { Page } from '@playwright/test';
import { HeaderFragment } from '../pages/components/header.fragment';

export class BasePage {
  readonly page: Page;
  readonly header: HeaderFragment;

  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderFragment(page);
  }
}