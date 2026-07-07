import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

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
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyEmptyCart();
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.verifyCartTitleIsVisible();
        await cartPage.verifyEmptyCartHasNoItems();
        await cartPage.verifyContinueShoppingButtonIsVisible();
        await cartPage.verifyCheckoutButtonIsVisible();
    })

});