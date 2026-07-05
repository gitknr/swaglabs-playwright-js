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

}