import { test } from '../../utils/testHooks.js';
import {InventoryPage} from '../../pages/index.js';

/**
 * Verifies that the Inventory page sorting options work as expected
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */

test.describe('Check Inventory Page Sorting', { tag: '@inventory' }, () => {

    test('Verify alphabetical sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // default sort option is Name (A to Z) - no need to select it
        await inventoryPage.verifyActiveSortOption('Name (A to Z)');
        // items are sorted alphabetically with this option selected
        await inventoryPage.verifyAlphabeticalSortOption();
    });

    test('Verify reverse alphabetical sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // select reverse alphabetical sort option
        await inventoryPage.selectSortOption('Name (Z to A)');
        // items are sorted in reverse alphabetical order with this option selected
        await inventoryPage.verifyReverseAlphabeticalSortOption();
    });

    test('Verify price sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // select price, low to high, sort option
        await inventoryPage.selectSortOption('Price (low to high)');
        // items are sorted by ascending price with this option selected
        await inventoryPage.verifyPriceSort();
    });

    test('Verify reverse price sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // select price, high to low, sort option
        await inventoryPage.selectSortOption('Price (high to low)');
        // items are sorted by descending price with this option selected
        await inventoryPage.verifyReversePriceSort();
    });

})

