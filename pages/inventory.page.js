import { expect } from '@playwright/test';

export class InventoryPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto('inventory.html', { waitUntil: 'load' });
        const inventoryContainer = this.page.locator('div[data-test="inventory-container"]');
        await expect(inventoryContainer).toBeVisible();
    }

    async verifyProductsTitleExists() {
        const productsTitle = this.page.locator('span[data-test="title"]');
        await expect(productsTitle).toBeVisible();
        await expect(productsTitle).toContainText('Products');
    }

    async clickItemTitleLink(title) {
        const itemContainer = await this.getItemContainerByTitle(title);
        await itemContainer.locator('a[data-test$="title-link"]').click();
    }

    async verifyActiveSortOption(sortOption) {
        const activeSortOption = this.page.locator('span[class="select_container"] span[data-test="active-option"]');
        await expect(activeSortOption).toContainText(sortOption);
    }

    async selectSortOption(sortOption) {
        const sortDropdown = this.page.locator('select[data-test="product-sort-container"]');
        await sortDropdown.selectOption(sortOption);
    }

    async getInventoryItemsNameArray() {
        const items = this.page.locator('div[data-test="inventory-items-name"]');
        return items.allTextContents();
    }

    async verifyAlphabeticalSortOption() {
        const namesArray = await this.getInventoryItemsNameArray();
        const sortedTexts = [...namesArray].sort((a, b) => a.localeCompare(b));
        expect(namesArray).toEqual(sortedTexts);
    }

    async verifyReverseAlphabeticalSortOption() {
        const namesArray = await this.getInventoryItemsNameArray();
        const sortedTexts = [...namesArray].sort((a, b) => b.localeCompare(a));
        expect(namesArray).toEqual(sortedTexts);
    }

    async getInventoryItemsPriceArray() {
        const items = this.page.locator('div[data-test="inventory-items-price"]');
        return items.allTextContents();
    }

    async verifyPriceSort() {
        const pricesArray = await this.getInventoryItemsPriceArray();
        const sortedPrices = [...pricesArray].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
        expect(pricesArray).toEqual(sortedPrices);
    }

    async verifyReversePriceSort() {
        const pricesArray = await this.getInventoryItemsPriceArray();
        const sortedPrices = [...pricesArray].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
        expect(pricesArray).toEqual(sortedPrices);
    }

    async getItemContainerByTitle(title) {
        const cssSelector = `div[data-test="inventory-item"]:has(div[data-test="inventory-item-name"]:has-text("${title}"))`;
        return this.page.locator(cssSelector);
    }

    async addItemToCartByTitle(title) {
        const itemContainer = await this.getItemContainerByTitle(title);
        await itemContainer.locator('button[data-test^="add-to-cart-"]').click();
    }

    async verifyRemoveItemButtonExists(title) {
        const itemContainer = await this.getItemContainerByTitle(title);
        await expect(itemContainer.locator('button[data-test^="remove-"]')).toBeVisible();
    }

    async removeItemFromCartByTitle(title) {
        const itemContainer = await this.getItemContainerByTitle(title);
        await itemContainer.locator('button[data-test^="remove-"]').click();
    }

    async verifyRemoveItemButtonDoesNotExist(title) {
        const itemContainer = await this.getItemContainerByTitle(title);
        await expect(itemContainer.locator('button[data-test^="remove-"]')).toBeHidden();
    }

    async verifyItemDetailByTitle(title, field, value) {
        const itemContainer = await this.getItemContainerByTitle(title);
        await expect(itemContainer.locator(`div[data-test="inventory-item-${field}"]`)).toHaveText(value);
    }
}
