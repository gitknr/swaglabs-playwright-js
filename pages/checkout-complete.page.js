import { expect } from '@playwright/test';

export class CheckoutCompletePage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async verifyCheckoutCompleteTitleExists() {
        const checkoutTitle = this.page.locator('span[data-test="title"]');
        await expect(checkoutTitle).toBeVisible();
        await expect(checkoutTitle).toContainText('Checkout: Complete');
    }

}
