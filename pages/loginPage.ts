import { Page, Locator } from "@playwright/test";  

export class LoginPage{

    // Define locators for the login page elements
    readonly page: Page;
    readonly signInLink: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly continueButton: Locator;
    readonly signinButton: Locator;

    // Constructor to initialize the locators
    constructor(page: Page) {
        this.page = page;
        this.signInLink = page.locator('[data-nav-role="signin"][data-nav-ref="nav_ya_signin"]');
        this.username = page.getByRole('textbox', { name: 'Enter mobile number or email' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.signinButton = page.getByRole('button', { name: 'Sign in' });
    }

    async getErrorMessage() {
        return this.page.locator("#auth-error-message-box");    }

    // Method to open the desired URL using Playwright's configured baseURL
    async open() {
        await this.page.goto('');   
    }

    // Method to perform login action

    async login(username: string, password: string) {
        // navigate to the URL
        await this.open();
        // Click on the sign-in link to navigate to the login page
        await this.signInLink.click();
         // Wait for the username field to be visible before interacting
         await this.username.waitFor();
        // Fill in the username and password fields and click the login button
        await this.username.fill(username);
        //click the continue button to proceed to the password entry
         await this.continueButton.click();
         await this.password.waitFor();
         await this.password.fill(password);
         await this.signinButton.click();
       
    }
}

