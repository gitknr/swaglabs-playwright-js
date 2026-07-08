import { test } from '../../utils/testHooks.js';
import {InventoryPage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

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

        // cart is empty by default
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyEmptyCart();

        // add item to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');

        // added item is reflected in header component
        await headerComponent.verifyShoppingCartItemCount(1);

        // an item in cart has a remove item button
        await inventoryPage.verifyRemoveItemButtonExists('Sauce Labs Backpack');
    });

    test('Remove item from cart', async ({page}) => {
        // add items to cart first - sauce labs does not expose add items network call,
        // so add items must be performed through UI again
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyEmptyCart();

        await inventoryPage.addItemToCartByTitle('Sauce Labs Fleece Jacket');

        // confirm the added item is reflected in the header component
        await headerComponent.verifyShoppingCartItemCount(1);

        // remove the item from cart
        await inventoryPage.removeItemFromCartByTitle('Sauce Labs Fleece Jacket');

        // confirm the item is no longer in the cart
        await headerComponent.verifyEmptyCart();

        // confirm the remove item button is no longer visible as the item is no longer in the cart
        await inventoryPage.verifyRemoveItemButtonDoesNotExist('Sauce Labs Fleece Jacket');
    });

    test('Add multiple items to cart', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyEmptyCart();

        // add several items to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        await headerComponent.verifyShoppingCartItemCount(1);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Onesie');
        await headerComponent.verifyShoppingCartItemCount(2);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Bolt T-Shirt');

        // confirm the added items are reflected in the header component
        await headerComponent.verifyShoppingCartItemCount(3);
    });

});