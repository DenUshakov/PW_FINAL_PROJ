import { BasePage } from './base.page';

export class HomePage extends BasePage {

  async goto(): Promise<void> {
    await this.page.goto('/');
  }
  
  async openProduct(name: string): Promise<void> {
    await this.page.getByRole('heading', { name }).click();
  }
}