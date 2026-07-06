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
        await inventoryPage.verifyActiveSortOption('Name (A to Z)');
        await inventoryPage.verifyAlphabeticalSortOption();
    });

    test('Verify reverse alphabetical sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.selectSortOption('Name (Z to A)');
        await inventoryPage.verifyReverseAlphabeticalSortOption();
    });

    test('Verify price sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.selectSortOption('Price (low to high)');
        await inventoryPage.verifyPriceSort();
    });

    test('Verify reverse price sort option', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.selectSortOption('Price (high to low)');
        await inventoryPage.verifyReversePriceSort();
    });

})

