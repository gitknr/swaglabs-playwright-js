import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage, CheckoutUserDetailsPage, CheckoutOverviewPage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

/**
 * Verifies checkout page display and functionality
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Confirm Details on Checkout Page', { tag: '@cart' }, () => {

    test('Verify Checkout Page Objects', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // navigate to cart page using header component
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();

        // proceed to checkout page
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();

        // verify checkout page objects
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.verifyCheckoutTitleExists();
        await checkoutUserDetailsPage.verifyCheckoutInfoFieldsAreVisible();
        await checkoutUserDetailsPage.verifyCancelButtonIsVisible();
        await checkoutUserDetailsPage.verifyContinueButtonIsVisible();
    })

    test('Cancel Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // add item to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');

        // click through to cart page using header component
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();

        // proceed to checkout page
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();

        // cancel checkout
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.clickCancelCheckoutButton();

        // user lands back on cart page
        await cartPage.verifyCartTitleIsVisible();

        // item is still in cart
        await headerComponent.verifyShoppingCartItemCount(1);
    })

    test('Verify Empty Checkout Info Validation', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // navigate to cart page using header component
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();

        // proceed to checkout page
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();

        // click continue button without entering any user details
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // verify validation error messages are displayed
        await checkoutUserDetailsPage.verifyValidationErrorIsVisible('Error: First Name is required');
        await checkoutUserDetailsPage.verifyErrorForField('firstName');
        await checkoutUserDetailsPage.verifyErrorForField('lastName');
        await checkoutUserDetailsPage.verifyErrorForField('postalCode');

        // add valid first name & continue
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // verify validation error message is now displayed for last name
        await checkoutUserDetailsPage.verifyValidationErrorIsVisible('Error: Last Name is required');

        // add valid last name & continue
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // verify validation error message is now displayed for postal code
        await checkoutUserDetailsPage.verifyValidationErrorIsVisible('Error: Postal Code is required');
    })

    test('Continue Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // navigate to cart page using header component
        const headerComponent = new HeaderComponent(page);
        await headerComponent.clickShoppingCartLink();

        // proceed to checkout page
        const cartPage = new CartPage(page);
        await cartPage.clickCheckoutButton();

        // enter valid user details & continue checkout
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.enterValidPostalCode('12345');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // user lands on checkout overview page
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.verifyCheckoutTitleExists();
    })

});