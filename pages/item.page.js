import { expect } from '@playwright/test';

export class ItemPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async visit(itemId) {
        await this.page.goto(`inventory-item.html?id=${itemId}`, {waitUntil: 'load'});
        const appLogo = this.page.locator('div[class="app_logo"]');
        await expect(appLogo).toBeVisible();
    }

    async verifyBackToProductsLink() {
        const backToProductsLink = this.page.locator('button[data-test="back-to-products"]');
        await expect(backToProductsLink).toBeVisible();
    }

    async clickBackToProductsLink() {
        const backToProductsLink = this.page.locator('button[data-test="back-to-products"]');
        await backToProductsLink.click();
    }

    async addItemToCart() {
        const addToCartButton = this.page.locator('button[data-test="add-to-cart"]');
        await addToCartButton.click();
    }

    async removeItemFromCart() {
        const removeFromCartButton = this.page.locator('button[data-test="remove"]');
        await removeFromCartButton.click();
    }

    async verifyItemDetail(field, value) {
        await expect(this.page.locator(`div[data-test="inventory-item-${field}"]`)).toHaveText(value);
    }

}