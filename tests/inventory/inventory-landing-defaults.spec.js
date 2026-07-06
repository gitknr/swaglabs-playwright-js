import { test } from '../../utils/testHooks.js';
import {InventoryPage} from '../../pages/index.js';

/**
 * Verifies that the Inventory landing page loads correctly
 * after a successful login, utilizing pre-authenticated state.
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Inventory Page Defaults', { tag: '@inventory' }, () => {

    test('Verify default state of Inventory landing page', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.verifyEmptyCart();
        await inventoryPage.verifyActiveSortOption('Name (A to Z)');
    });

});