import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import loginUsers from "../inputs_testData/loginUsers.json";

test.describe("Login Tests", () => {

    // Declare a variable to hold the instance of LoginPage
    let loginPage: LoginPage;

    // Use the beforeEach hook to initialize the LoginPage instance before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
    }); 

    // Test case for valid login
   test("Valid Login Test", async () => {

        const validUser = loginUsers.validUser;
        await loginPage.login(validUser.username, validUser.password);      
        // Add assertions to verify successful login, e.g., check for a specific element on the dashboard
         await expect(loginPage.signInLink).not.toContainText('Hello, sign in')
        
    });

    // Test case for invalid login
    test("Invalid Login Test", async () => {
        const invalidUser = loginUsers.invalidUser;
        await loginPage.login(invalidUser.username, invalidUser.password);      
        // Add assertions to verify error message is displayed
        await expect(await loginPage.getErrorMessage()).toBeVisible();
        await expect(await loginPage.getErrorMessage()).toHaveText('There was a problem\nYour password is incorrect');
    });
});
