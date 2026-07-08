import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage} from '../../pages/index.js';
import {HeaderComponent, CartListComponent} from '../../shared-components/index.js';

/**
 * Verifies Empty cart displays correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Empty Cart Display', { tag: '@cart' }, () => {

    test('Verify Empty Cart Details', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // no items added to cart so empty cart is displayed
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyEmptyCart();

        // click through to cart page using header component
        await headerComponent.clickShoppingCartLink();

        // user lands on cart page
        const cartPage = new CartPage(page);
        await cartPage.verifyCartTitleIsVisible();

        // empty cart has no displayed items
        const cartListComponent = new CartListComponent(page);
        await cartListComponent.verifyEmptyCartHasNoItems();

        // cart buttons are visible
        await cartPage.verifyContinueShoppingButtonIsVisible();
        await cartPage.verifyCheckoutButtonIsVisible();
    })

});