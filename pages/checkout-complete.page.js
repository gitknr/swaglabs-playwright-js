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

    async verifyCheckoutCompleteHeaderExists() {
        const checkoutHeader = this.page.locator('h2[data-test="complete-header"]');
        await expect(checkoutHeader).toBeVisible();
        await expect(checkoutHeader).toContainText('Thank you for your order!');
    }

    async verifyCheckoutCompleteTextExists() {
        const checkoutText = this.page.locator('div[data-test="complete-text"]');
        await expect(checkoutText).toBeVisible();
        await expect(checkoutText).toContainText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    }

    async verifyBackHomeButtonIsVisible() {
        const continueShoppingButton = this.page.locator('button[data-test="back-to-products"]');
        await expect(continueShoppingButton).toBeVisible();
    }

    async verifyGenerateOrderPdfButtonIsVisible() {
        const generateOrderPdfButton = this.page.locator('button[data-test="generate-pdf-order"]');
        await expect(generateOrderPdfButton).toBeVisible();
    }

    async clickBackHomeButton() {
        const continueShoppingButton = this.page.locator('button[data-test="back-to-products"]');
        await continueShoppingButton.click();
    }

    async clickGenerateOrderPdfButton() {
        const downloadPromise = this.page.waitForEvent('download');
        const generateOrderPdfButton = this.page.locator('button[data-test="generate-pdf-order"]');
        await generateOrderPdfButton.click();

        const download = await downloadPromise;
        const pdfPath = './downloads/order.pdf';
        await download.saveAs(pdfPath);

        return pdfPath;
    }

}
