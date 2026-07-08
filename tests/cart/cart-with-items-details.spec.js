import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage} from '../../pages/index.js';
import {HeaderComponent, CartListComponent} from '../../shared-components/index.js';

/**
 * Verifies cart with items displays correctly
 *
 * NOTE: Execution requires Playwright's configuration ('playwright.config.js')
 * to first execute the setup script (e.g., auth.setup.js) and load the resulting storage state.
 */
test.describe('Check Cart With Items Display', { tag: '@cart' }, () => {

    test('Verify Cart With Item Details', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');

        const headerComponent = new HeaderComponent(page);
        // added item is reflected in header component
        await headerComponent.verifyShoppingCartItemCount(1);
        // click through to cart page using header component
        await headerComponent.clickShoppingCartLink();

        const cartPage = new CartPage(page);
        await cartPage.verifyCartTitleIsVisible();

        // verify cart item exists on cart page
        const cartListComponent = new CartListComponent(page);
        await cartListComponent.verifyCartItemExists('Sauce Labs Backpack');

        // verify item details are displayed
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
        await cartListComponent.verifyItemQuantity('Sauce Labs Backpack', 1);

        // verify cart buttons are visible
        await cartPage.verifyContinueShoppingButtonIsVisible();
        await cartPage.verifyCheckoutButtonIsVisible();
    })

    test('Verify Cart With Multiple Items Details', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');

        // added item is reflected in header component
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyShoppingCartItemCount(1);

        // add another item to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Onesie');

        // added item is reflected in header component
        await headerComponent.verifyShoppingCartItemCount(2);

        // add a third item to cart
        await inventoryPage.addItemToCartByTitle('Sauce Labs Bolt T-Shirt');

        // added item is reflected in header component
        await headerComponent.verifyShoppingCartItemCount(3);
        // click through to cart page using header component
        await headerComponent.clickShoppingCartLink();

        const cartPage = new CartPage(page);
        await cartPage.verifyCartTitleIsVisible();

        // verify all added items exist on cart page & display with their item details
        const cartListComponent = new CartListComponent(page);
        await cartListComponent.verifyCartItemExists('Sauce Labs Backpack');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
        await cartListComponent.verifyItemQuantity('Sauce Labs Backpack', 1);

        await cartListComponent.verifyCartItemExists('Sauce Labs Onesie');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Onesie', 'desc', 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Onesie', 'price', '$7.99');
        await cartListComponent.verifyItemQuantity('Sauce Labs Onesie', 1);

        await cartListComponent.verifyCartItemExists('Sauce Labs Bolt T-Shirt');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Bolt T-Shirt', 'desc', 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.');
        await cartListComponent.verifyItemDetailByTitle('Sauce Labs Bolt T-Shirt', 'price', '$15.99');
        await cartListComponent.verifyItemQuantity('Sauce Labs Bolt T-Shirt', 1);

        // verify cart buttons are visible
        await cartPage.verifyContinueShoppingButtonIsVisible();
        await cartPage.verifyCheckoutButtonIsVisible();
    })

});