import { expect } from '@playwright/test';

export class CheckoutStepOnePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('checkout-step-one.html', { waitUntil: 'load' });
    }

    async verifyCheckoutTitleExists() {
        const checkoutTitle = this.page.locator('span[data-test="title"]');
        await expect(checkoutTitle).toBeVisible();
        await expect(checkoutTitle).toContainText('Checkout: Your Information');
    }
}
