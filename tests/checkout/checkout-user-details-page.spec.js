import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage, CheckoutUserDetailsPage, CheckoutOverviewPage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

/**
 * Verifies checkout page display and functionality
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Details on Checkout Page', { tag: '@cart' }, () => {

    test('Verify Checkout Page Objects', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.verifyCheckoutTitleExists();
        await checkoutUserDetailsPage.verifyCheckoutInfoFieldsAreVisible();
        await checkoutUserDetailsPage.verifyCancelButtonIsVisible();
        await checkoutUserDetailsPage.verifyContinueButtonIsVisible();
    })

    test('Cancel Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.clickCancelCheckoutButton();
        await cartPage.verifyCartTitleIsVisible();
        await headerComponent.verifyShoppingCartItemCount(1);
    })

    test('Verify Empty Checkout Info Validation', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.clickContinueCheckoutButton();
        await checkoutUserDetailsPage.verifyValidationErrorIsVisible('Error: First Name is required');
        await checkoutUserDetailsPage.verifyErrorForField('firstName');
        await checkoutUserDetailsPage.verifyErrorForField('lastName');
        await checkoutUserDetailsPage.verifyErrorForField('postalCode');
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();
        await checkoutUserDetailsPage.verifyValidationErrorIsVisible('Error: Last Name is required');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();
        await checkoutUserDetailsPage.verifyValidationErrorIsVisible('Error: Postal Code is required');
    })

    test('Continue Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.enterValidPostalCode('12345');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.verifyCheckoutTitleExists();
    })

});