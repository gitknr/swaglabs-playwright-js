import { expect } from '@playwright/test';

export class CheckoutUserDetailsPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async verifyCheckoutTitleExists() {
        const checkoutTitle = this.page.locator('span[data-test="title"]');
        await expect(checkoutTitle).toBeVisible();
        await expect(checkoutTitle).toContainText('Checkout: Your Information');
    }

    async verifyCheckoutInfoFieldsAreVisible() {
        const firstNameInput = this.page.locator('input[data-test="firstName"]');
        const lastNameInput = this.page.locator('input[data-test="lastName"]');
        const postalCodeInput = this.page.locator('input[data-test="postalCode"]');
        await expect(firstNameInput).toBeVisible();
        await expect(lastNameInput).toBeVisible();
        await expect(postalCodeInput).toBeVisible();
    }

    async verifyCancelButtonIsVisible() {
        const cancelButton = this.page.locator('div[class="checkout_buttons"] button[data-test="cancel"]');
        await expect(cancelButton).toBeVisible();
    }

    async verifyContinueButtonIsVisible() {
        const continueButton = this.page.locator('div[class="checkout_buttons"] input[data-test="continue"]');
        await expect(continueButton).toBeVisible();
    }

    async clickCancelCheckoutButton() {
        const cancelButton = this.page.locator('div[class="checkout_buttons"] button[data-test="cancel"]');
        await cancelButton.click();
    }

    async clickContinueCheckoutButton() {
        const continueButton = this.page.locator('div[class="checkout_buttons"] input[data-test="continue"]');
        await continueButton.click();
    }

    async verifyValidationErrorIsVisible(errorMessage) {
        const validationError = this.page.locator(`h3[data-test="error"]`);
        await expect(validationError).toHaveText(errorMessage);
    }

    async verifyErrorForField(field) {
        const errorField = this.page.locator(`input[class^="input_error"][data-test="${field}"]`);
        await expect(errorField).toBeVisible();
    }

    async enterValidFirstName(firstName) {
        const firstNameInput = this.page.locator('input[data-test="firstName"]');
        await firstNameInput.fill(firstName);
    }

    async enterValidLastName(firstName) {
        const firstNameInput = this.page.locator('input[data-test="lastName"]');
        await firstNameInput.fill(firstName);
    }

    async enterValidPostalCode(postalCode) {
        const postalCodeInput = this.page.locator('input[data-test="postalCode"]');
        await postalCodeInput.fill(postalCode);
    }
}
