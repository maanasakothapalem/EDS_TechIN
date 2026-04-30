import { Page, BrowserContext } from '@playwright/test';

// Define a type for product details to be used in the navigation utility
type Product = {
  name: string;
  price: number;
  index: number;
};

export class NavigationUtils {

  constructor(private page: Page) {}

    /**
     * Method to open the product details page by clicking on the product link in the search results. It waits for the search results to load and then clicks on the specified product based on its index. If a new page is opened as a result of the click, it waits for that page to load and returns it; otherwise, it returns the current page.
     * @param product 
     * @param context 
     * @returns 
     */
    async  openProduct(product: Product, context: BrowserContext): Promise<Page> {

        // Wait for the search results to load 
        const items = this.page.locator('[data-component-type="s-search-result"]');
        // Scroll down until the desired product is visible in the search results
        while ((await items.count()) <= product.index) {
                await this.page.mouse.wheel(0, 3000);
        }

        // Get the product link and scroll it into view
        const item = items.nth(product.index);
        const link = item.locator('h2.a-size-medium');
        await link.scrollIntoViewIfNeeded();
        await link.waitFor({ state: 'visible', timeout: 5000 });

        // Click on the product link and wait for the new page to load
        const [newPage] = await Promise.all([
                context.waitForEvent('page').catch(() => null),
                link.click()
        ]);
        // If a new page is opened, wait for it to load and return it; otherwise, return the current page
        const productPage = newPage || this.page;

        // Wait for the new page to load before returning it
        await productPage.waitForLoadState('domcontentloaded');
        return productPage;
    }

}