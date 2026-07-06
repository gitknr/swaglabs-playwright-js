import { test } from '../../utils/testHooks.js';
import {InventoryPage, ItemPage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

/**
 * Verifies that the Item Details display correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Item Page Cart Actions', { tag: '@items' }, () => {

    test('Add item to cart from Item Page', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.clickItemTitleLink('Sauce Labs Backpack');
        const itemPage = new ItemPage(page);
        await itemPage.addItemToCart();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyShoppingCartItemCount(1);
    })

    test('Remove item from cart from Item Page', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        await inventoryPage.clickItemTitleLink('Sauce Labs Backpack');
        const itemPage = new ItemPage(page);
        await itemPage.removeItemFromCart();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyEmptyCart();
    })

});