import { test as setup, expect } from '@playwright/test';

// Define where the authenticated browser state will be saved
const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    // 1. Navigate to your login page
    await page.goto(process.env.BASE_URL);

    // 2. Fill out the login form
    await page.fill('input[data-test="username"]', process.env.TEST_USERNAME);
    await page.fill('input[data-test="password"]', process.env.TEST_PASSWORD);

    // Wait for the login button to be interactable
    const loginButton = page.locator('input[data-test="login-button"]');
    await loginButton.click();

    // 3. Wait for a post-login indicator to confirm success
    await expect(page).toHaveURL(/inventory.html/);
    // Alternatively, assert visibility: await expect(page.getByText('Welcome')).toBeVisible();

    // 4. Save storage state (cookies, localStorage) to the JSON file
    await page.context().storageState({ path: authFile });
});