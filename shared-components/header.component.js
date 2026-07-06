import { expect } from '@playwright/test';

export class HeaderComponent {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async verifyEmptyCart() {
        const shoppingCartBadge = this.page.locator('a[data-test="shopping-cart-link"] span[data-test="shopping-cart-badge"]');
        await expect(shoppingCartBadge).toBeHidden()
    }

    async verifyShoppingCartItemCount(itemCount) {
        const cartItemCount = await this.page.locator('span[data-test="shopping-cart-badge"]').textContent();
        expect(cartItemCount).toBe(itemCount.toString());
    }
}