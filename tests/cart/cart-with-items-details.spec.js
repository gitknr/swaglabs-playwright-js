import { test } from '../../utils/testHooks.js';
import {InventoryPage, CartPage} from '../../pages/index.js';
import {HeaderComponent} from '../../shared-components/index.js';

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
        await headerComponent.verifyShoppingCartItemCount(1);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.verifyCartTitleIsVisible();
        await cartPage.verifyCartItemExists('Sauce Labs Backpack');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
        await cartPage.verifyItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.verifyContinueShoppingButtonIsVisible();
        await cartPage.verifyCheckoutButtonIsVisible();
    })

    test('Verify Cart With Multiple Items Details', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        await inventoryPage.addItemToCartByTitle('Sauce Labs Backpack');
        const headerComponent = new HeaderComponent(page);
        await headerComponent.verifyShoppingCartItemCount(1);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Onesie');
        await headerComponent.verifyShoppingCartItemCount(2);
        await inventoryPage.addItemToCartByTitle('Sauce Labs Bolt T-Shirt');
        await headerComponent.verifyShoppingCartItemCount(3);
        await headerComponent.clickShoppingCartLink();
        const cartPage = new CartPage(page);
        await cartPage.verifyCartTitleIsVisible();
        await cartPage.verifyCartItemExists('Sauce Labs Backpack');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'desc', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Backpack', 'price', '$29.99');
        await cartPage.verifyItemQuantity('Sauce Labs Backpack', 1);
        await cartPage.verifyCartItemExists('Sauce Labs Onesie');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Onesie', 'desc', 'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Onesie', 'price', '$7.99');
        await cartPage.verifyItemQuantity('Sauce Labs Onesie', 1);
        await cartPage.verifyCartItemExists('Sauce Labs Bolt T-Shirt');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Bolt T-Shirt', 'desc', 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.');
        await cartPage.verifyItemDetailByTitle('Sauce Labs Bolt T-Shirt', 'price', '$15.99');
        await cartPage.verifyItemQuantity('Sauce Labs Bolt T-Shirt', 1);
        await cartPage.verifyContinueShoppingButtonIsVisible();
        await cartPage.verifyCheckoutButtonIsVisible();
    })

});