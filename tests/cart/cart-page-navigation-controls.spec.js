import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage, CheckoutStepOnePage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

/**
 * Verifies cart page navigation controls work correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Cart Page Navigation Controls Work As Intended', { tag: '@cart' }, () => {

    test('Verify Continue Shopping Button', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickContinueShoppingButton();
        // user lands back on inventory page
        await inventoryPage.verifyProductsTitleExists();
    })

    test('Verify Checkout Button', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.verifyCheckoutTitleExists();
    })

});