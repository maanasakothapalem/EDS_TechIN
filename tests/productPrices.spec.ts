import { test, expect,Page,BrowserContext} from "@playwright/test";
import { SearchPage } from "../pages/searchPage";
import { NavigationUtils } from "../commonUtils/navigation.page";

test.describe("Product Prices", () => {
      
     // Set a longer timeout for this test suite to accommodate for potential delays in loading search results and product details
     test.setTimeout(90000);

    // Test data and variables to store product details
    let productName = '"iQOO Neo 9 Pro 5G 8GB RAM 256GB"';
    let productPrices: { name: string; price: number; index: number; }[] = [];
    let lowest: { name: string; price: number; index: number; };
    let highest: { name: string; price: number; index: number;};

   test("Get the lowest and highest price with product name and details", async ({ page, context }: { page: Page; context: BrowserContext }) => {
           
        // Intialise and login to the application
        await page.goto('https://www.amazon.in');

        // Search for the product and get the price details
         let searchPage = new SearchPage(page);
         await searchPage.searchProduct(productName);

        // Wait for the search results to load and store the prices
        await searchPage.getSearchResults();
        productPrices = await searchPage.getProductPrices();  

        // Assert that we have some products in the search results
         expect(productPrices.length).toBeGreaterThan(0); 

        // Find the lowest and highest price from the list of products
         lowest = productPrices.reduce((min, p) => p.price < min.price ? p : min);
         highest = productPrices.reduce((max, p) => p.price > max.price ? p : max);

        // Print the lowest and highest price along with the product name
        console.log("Lowest:", lowest.name, lowest.price,lowest.index);
        console.log("Highest:", highest.name, highest.price,highest.index);
        
         // Click on the lowest priced product to navigate to the product details page
        const navigationUtils = new NavigationUtils(page);
        let detailsSelector = await searchPage.getProductDetails();

        //  Lowest product
        const lowPage = await navigationUtils.openProduct(lowest, context,);
       
        // Wait for the product details to load and print them
        await lowPage.waitForSelector(detailsSelector);
        const lowDetails = await lowPage.locator(detailsSelector).allTextContents();

        console.log("\nLowest Product Details : " + lowest.name);
        lowDetails.forEach(d => console.log(d));
        
        // Highest product
        const highPage = await navigationUtils.openProduct(highest, context);

        // Wait for the product details to load and print them
        await highPage.waitForSelector(detailsSelector);
        const highDetails = await highPage.locator(detailsSelector).allTextContents();

        console.log("\nHighest Product Details: " + highest.name);
        highDetails.forEach((d: any) => console.log(d))

   });

   });
