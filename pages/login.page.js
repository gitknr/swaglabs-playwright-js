import { expect } from '@playwright/test';

export class LoginPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('', {waitUntil: 'load'});
        const loginLogo = this.page.locator('div[class="login_logo"]');

        await expect(loginLogo).toBeVisible();
    }

    async submitLoginForm(username, password) {
        const usernameInput = this.page.locator('input[data-test="username"]');
        const passwordInput = this.page.locator('input[data-test="password"]');
        const loginButton = this.page.locator('input[data-test="login-button"]');

        await usernameInput.fill(username);
        await passwordInput.fill(password);
        await loginButton.click();
    }

    async verifyLoginErrorMessage(errorMessage){
        const errorMessageContainer = this.page.locator('div[class^="error-message-container"] h3[data-test="error"]');
        await expect(errorMessageContainer).toHaveText(errorMessage);
    }
}