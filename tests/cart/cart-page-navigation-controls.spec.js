import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage, CheckoutUserDetailsPage} from '../../pages/index.js';
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

        // click on cart link to navigate to cart page
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

        // click on cart link to navigate to cart page
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();

        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();

        // user lands on checkout user details page
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.verifyCheckoutTitleExists();
    })

});