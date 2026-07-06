import { test } from '../../utils/testHooks.js';
import {LoginPage} from '../../pages/index.js';

test.describe('Check User Login Functionality', { tag: '@user-login' }, () => {

    test('Verify locked out user outcome', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.submitLoginForm('locked_out_user', 'secret_sauce');
        await loginPage.verifyLoginErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    });

});
