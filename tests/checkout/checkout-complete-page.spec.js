import { test } from '../../utils/testHooks.js';
import { expect } from '@playwright/test';

import {
    InventoryPage,
    CartPage,
    CheckoutUserDetailsPage,
    CheckoutOverviewPage,
    CheckoutCompletePage
} from '../../pages/index.js';
import { HeaderComponent } from '../../shared-components/index.js';
import fs from "node:fs/promises";

/**
 * Verifies checkout page display and functionality
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Details on Checkout Complete Page', { tag: '@cart' }, () => {

    test('Verify Checkout Complete Page Objects', async ({page}) => {
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

        // verify expected page objects exist
        await checkoutCompletePage.verifyCheckoutCompleteHeaderExists()
        await checkoutCompletePage.verifyCheckoutCompleteTextExists();
        await checkoutCompletePage.verifyBackHomeButtonIsVisible();
        await checkoutCompletePage.verifyGenerateOrderPdfButtonIsVisible();
    })

    test('Verify Back Home Button', async ({page}) => {
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

        // click back home button
        await checkoutCompletePage.clickBackHomeButton();

        // verify user is back on inventory page
        await inventoryPage.verifyProductsTitleExists();
    })

    test('Generate Order PDF', async ({page}) => {
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

        // download the order pdf file
        const pdfPath = await checkoutCompletePage.clickGenerateOrderPdfButton();
        const stat = await fs.stat(pdfPath);

        // ensure a file was downloaded as specified
        expect(stat.size).toBeGreaterThan(0);
    })

});