import { Page } from '@playwright/test';

export class SearchPage {

  constructor(private page: Page) {}

// Locators for search results
async getsearchBox() {
    return this.page.locator('#twotabsearchtextbox');
  }
async getSearchResults() {
    return this.page.locator('[data-component-type="s-search-result"]');
  } 
async getProductDetails() {
    return '#feature-bullets li';
}


/**
 * Method to search for a product 
 * @param product Name of the product
 */

  async searchProduct(product: string) {

    // Fill the search box and press Enter to perform the search
    await (await this.getsearchBox()).fill(product);
    await (await this.getsearchBox()).press('Enter');
    // Wait for the search results to load
    await this.page.waitForSelector('[data-component-type="s-search-result"]');

  }

/**
 * Method to get product names and their corresponding prices from the search results
 * @returns promise that resolves to an array of objects containing product name, price, and index in the search results
 */

  async getProductPrices(): Promise<{ name: string; price: number; index: number; }[]> { {

    // Get the list of search result items and extract the product names and prices
    const items = await this.getSearchResults();
    const count = await items.count();

    const productMap: { name: string; price: number; index: number; }[] = [];

    // Loop through each search result item and extract the product name and price
    for (let i = 0; i < count; i++) {
      const item = items.nth(i);
      try {
            // get the product name
           const titleLocator = item.locator('h2 span');
            if (await titleLocator.count() === 0) continue;
            const name = await titleLocator.first().innerText({ timeout: 2000 });

            // Check price exists BEFORE accessing
            const wholeLocator = item.locator('.a-price-whole');

            if (await wholeLocator.count() === 0) continue;
            // get the whole part of the price and handle cases where it might not be present
            const whole = await wholeLocator.first().innerText({ timeout: 2000 }).catch(() => null);

            if (!whole) continue;
            // check if fraction exists, if not default to '00'
            const fractionLocator = item.locator('.a-price-fraction');
            const fraction = (await fractionLocator.count()) > 0 ? await fractionLocator.first().
                innerText({ timeout: 1000 }).catch(() => '00'): '00';

            // Combine whole and fraction to get the complete price, removing commas for conversion
            const price = Number(whole.replace(/,/g, '')) + Number(fraction) / 100;

            productMap.push({ name, price, index: i });
        } 
      catch (e) {
        console.log('Error while getting the prices: ' + (e as Error).message);
      }
    }
    return productMap;
  }
}
}
