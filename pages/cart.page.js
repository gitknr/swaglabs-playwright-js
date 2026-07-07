import { expect } from '@playwright/test';

export class CartPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('cart.html', { waitUntil: 'load' });
        await this.verifyCartTitleIsVisible();
    }

    async verifyCartTitleIsVisible() {
        const cartTitle = this.page.locator('span[data-test="title"]');
        await expect(cartTitle).toBeVisible();
        await expect(cartTitle).toContainText('Your Cart');
    }

    async verifyEmptyCartHasNoItems() {
        const cartItems = this.page.locator('div[data-test="cart-list"] div[data-test="inventory-item"]');
        await expect(cartItems).toBeHidden()
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

    async getCartInventoryItemByName(title) {
        const cssSelector = `div[data-test="cart-list"] div[data-test="inventory-item"]:has(div[data-test="inventory-item-name"]:has-text("${title}"))`;
        return this.page.locator(cssSelector);
    }

    async verifyCartItemExists(title) {
        const itemContainer = await this.getCartInventoryItemByName(title);
        await expect(itemContainer).toBeVisible();
    }

    async verifyItemDetailByTitle(title, field, value) {
        const itemContainer = await this.getCartInventoryItemByName(title);
        await expect(itemContainer.locator(`div[data-test="inventory-item-${field}"]`)).toHaveText(value);
    }

    async verifyItemQuantity(title, quantity) {
        const itemContainer = await this.getCartInventoryItemByName(title);
        await expect(itemContainer.locator('div[data-test="item-quantity"]')).toHaveText(quantity.toString());
    }

}
