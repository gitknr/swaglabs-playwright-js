import { test } from '../../utils/testHooks.js';
import {
    InventoryPage,
    CartPage,
    CheckoutUserDetailsPage,
    CheckoutOverviewPage,
    CheckoutCompletePage
} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

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
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
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
        await checkoutOverviewPage.verifyCancelCheckoutButtonIsVisible();
        await checkoutOverviewPage.verifyFinishCheckoutButtonIsVisible();
        await checkoutOverviewPage.verifyCartItemExists('Sauce Labs Backpack')
        await checkoutOverviewPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await checkoutOverviewPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
        await checkoutOverviewPage.verifyItemQuantity('Sauce Labs Backpack', 1);
        await checkoutOverviewPage.verifyPaymentInfo('SauceCard #31337');
        await checkoutOverviewPage.verifyShippingInfo('Free Pony Express Delivery!');
        await checkoutOverviewPage.verifySubtotal('$29.99');
        await checkoutOverviewPage.verifyTax('$2.40');
        await checkoutOverviewPage.verifyTotal('$32.39');
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
        await checkoutUserDetailsPage.enterValidFirstName('Test-FirstName');
        await checkoutUserDetailsPage.enterValidLastName('Test-LastName');
        await checkoutUserDetailsPage.enterValidPostalCode('12345');
        await checkoutUserDetailsPage.clickContinueCheckoutButton();
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await checkoutOverviewPage.verifyCheckoutTitleExists();
        await checkoutOverviewPage.clickCancelCheckoutButton();
        await inventoryPage.verifyProductsTitleExists();
        await headerComponent.verifyShoppingCartItemCount(1);
    })

    test('Finish Checkout', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
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
        await checkoutOverviewPage.clickFinishCheckoutButton();
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await checkoutCompletePage.verifyCheckoutCompleteTitleExists();
        await headerComponent.verifyEmptyCart();
    })

});