import { expect } from '@playwright/test';

export class CartPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async verifyCartTitleIsVisible() {
        const cartTitle = this.page.locator('span[data-test="title"]');
        await expect(cartTitle).toBeVisible();
        await expect(cartTitle).toContainText('Your Cart');
    }

    async verifyContinueShoppingButtonIsVisible() {
        const continueShoppingButton = this.page.locator('button[data-test="continue-shopping"]');
        await expect(continueShoppingButton).toBeVisible();
    }

    async verifyCheckoutButtonIsVisible() {
        const checkoutButton = this.page.locator('button[data-test="checkout"]');
        await expect(checkoutButton).toBeVisible();
    }

    async clickContinueShoppingButton() {
        const continueShoppingButton = this.page.locator('button[data-test="continue-shopping"]');
        await continueShoppingButton.click();
    }

    async clickCheckoutButton() {
        const checkoutButton = this.page.locator('button[data-test="checkout"]');
        await checkoutButton.click();
    }

}
