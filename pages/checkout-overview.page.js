import { expect } from '@playwright/test';

export class CheckoutOverviewPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async verifyCheckoutTitleExists() {
        const checkoutTitle = this.page.locator('span[data-test="title"]');
        await expect(checkoutTitle).toBeVisible();
        await expect(checkoutTitle).toContainText('Checkout: Overview');
    }

    async verifyCancelCheckoutButtonIsVisible() {
        const cancelButton = this.page.locator('div[class="cart_footer"] button[data-test="cancel"]');
        await expect(cancelButton).toBeVisible();
    }

    async verifyFinishCheckoutButtonIsVisible() {
        const continueButton = this.page.locator('div[class="cart_footer"] button[data-test="finish"]');
        await expect(continueButton).toBeVisible();
    }

    async clickCancelCheckoutButton() {
        const cancelButton = this.page.locator('div[class="cart_footer"] button[data-test="cancel"]');
        await cancelButton.click();
    }

    async clickFinishCheckoutButton() {
        const finishButton = this.page.locator('div[class="cart_footer"] button[data-test="finish"]');
        await finishButton.click();
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

    async verifyPaymentInfo(paymentInfo) {
        const paymentInfoValue = this.page.locator('div[data-test="payment-info-value"]');
        await expect(paymentInfoValue).toContainText(paymentInfo);
    }

    async verifyShippingInfo(shippingInfo) {
        const shippingInfoValue = this.page.locator('div[data-test="shipping-info-value"]');
        await expect(shippingInfoValue).toContainText(shippingInfo);
    }

    async verifySubtotal(subtotal) {
        const subtotalValue = this.page.locator('div[data-test="subtotal-label"]');
        await expect(subtotalValue).toContainText(subtotal);
    }

    async verifyTax(tax) {
        const taxValue = this.page.locator('div[data-test="tax-label"]');
        await expect(taxValue).toContainText(tax);
    }

    async verifyTotal(total) {
        const totalValue = this.page.locator('div[data-test="total-label"]');
        await expect(totalValue).toContainText(total);
    }

}
