import { expect } from '@playwright/test';

export class CartListComponent {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async verifyEmptyCartHasNoItems() {
        const cartItems = this.page.locator('div[data-test="cart-list"] div[data-test="inventory-item"]');
        await expect(cartItems).toBeHidden()
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