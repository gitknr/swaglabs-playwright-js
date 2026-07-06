import { test } from '../../utils/testHooks.js';
import {InventoryPage} from '../../pages/index.js';

/**
 * Verifies that the Inventory page cart behaviors work as expected
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Inventory Cart Actions', { tag: '@inventory' }, () => {

    test('Add item to cart', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.verifyEmptyCart();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        await inventoryPage.verifyShoppingCartItemCount(1);
        await inventoryPage.verifyRemoveItemButtonExists('Sauce Labs Backpack');
    });

    test('Remove item from cart', async ({page}) => {
        // Add items to cart first - sauce labs does not expose Add items network call, so Add items must be performed through UI
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.verifyEmptyCart();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Fleece Jacket');
        await inventoryPage.verifyShoppingCartItemCount(1);
        await inventoryPage.removeItemFromCartByTitle('Sauce Labs Fleece Jacket');
        await inventoryPage.verifyEmptyCart();
        await inventoryPage.verifyRemoveItemButtonDoesNotExist('Sauce Labs Fleece Jacket');
    });

    test('Add multiple items to cart', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.verifyEmptyCart();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        await inventoryPage.verifyShoppingCartItemCount(1);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Onesie');
        await inventoryPage.verifyShoppingCartItemCount(2);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Bolt T-Shirt');
        await inventoryPage.verifyShoppingCartItemCount(3);
    });

});