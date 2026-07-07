import { test } from '../../utils/testHooks.js';
import {InventoryPage, ItemPage} from '../../pages/index.js';

/**
 * Verifies that the Item Details display correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Item Details', { tag: '@items' }, () => {

    test('Verify Item Details on Inventory Page', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await inventoryPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
    });

    test('Verify Item Details on Item Page', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.clickItemTitleLink('Sauce Labs Backpack');
        const itemPage = new ItemPage(page);
        await itemPage.verifyBackToProductsLink();
        await itemPage.verifyItemDetail('name', 'Sauce Labs Backpack');
        await itemPage.verifyItemDetail('desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await itemPage.verifyItemDetail('price', '$29.99');
    });

});