import { test } from '../../utils/testHooks.js';
import {
    InventoryPage,
    CartPage,
    CheckoutUserDetailsPage,
    CheckoutOverviewPage,
    CheckoutCompletePage
} from '../../pages/index.js';
import {HeaderComponent, CartListComponent} from '../../shared-components/index.js';

/**
 * Verifies checkout page display and functionality
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Details on Checkout Page', { tag: '@cart' }, () => {

    test('Verify Checkout Overview Page Objects', async ({page}) => {
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

        // enter valid user details
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.enterValidPostalCode('12345');

        // proceed with checkout
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // verify checkout overview objects
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.verifyCheckoutTitleExists();
        await checkoutOverviewPage.verifyCancelCheckoutButtonIsVisible();
        await checkoutOverviewPage.verifyFinishCheckoutButtonIsVisible();

        // verify details in checkout overview page cart list
        const cartListComponent = new CartListComponent(page);
        await cartListComponent.verifyCartItemExists('Sauce Labs Backpack');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
        await cartListComponent.verifyItemQuantity('Sauce Labs Backpack', 1);

        // verify checkout overview page summary information
        await checkoutOverviewPage.verifyPaymentInfo('SauceCard #31337');
        await checkoutOverviewPage.verifyShippingInfo('Free Pony Express Delivery!');
        await checkoutOverviewPage.verifySubtotal('$29.99');
        await checkoutOverviewPage.verifyTax('$2.40');
        await checkoutOverviewPage.verifyTotal('$32.39');
    })

    test('Cancel Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // add item to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        const headerComponent = new HeaderComponent(page);

        // click through to cart page using header component
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);

        // proceed to checkout page
        await cartPage.clickCheckoutButton();
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);

        // enter valid user details & continue checkout
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.enterValidPostalCode('12345');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // user lands on checkout overview page
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.verifyCheckoutTitleExists();

        // cancel checkout
        await checkoutOverviewPage.clickCancelCheckoutButton();

        // user lands back on inventory page
        await inventoryPage.verifyProductsTitleExists();

        // item is still in cart
        await headerComponent.verifyShoppingCartItemCount(1);
    })

    test('Finish Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // add item to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        const headerComponent = new HeaderComponent(page);

        // click through to cart page using header component
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);

        // proceed to checkout page
        await cartPage.clickCheckoutButton();
        const checkoutUserDetailsPage = new CheckoutUserDetailsPage(page);

        // enter valid user details & continue checkout
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.enterValidPostalCode('12345');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();

        // proceed to finish checkout
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.verifyCheckoutTitleExists();
        await checkoutOverviewPage.clickFinishCheckoutButton();

        // user lands on checkout complete page
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.verifyCheckoutCompleteTitleExists();

        // item is no longer in cart after checkout
        await headerComponent.verifyEmptyCart();
    })

});