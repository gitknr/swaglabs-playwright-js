# Swag Labs Playwright Tests

Playwright test suite for the Sauce Demo / Swag Labs application, organized with page objects and shared components.

The suite currently covers authenticated browser flows, checkout behavior, cart state, and checkout-complete actions such as returning to the inventory page and downloading the order PDF.

## What this repo contains

- `tests/` Playwright specs
- `pages/` page objects for login, inventory, cart, and checkout screens
- `shared-components/` reusable UI components such as the header and cart list
- `utils/testHooks.js` shared test fixture logic
- `playwright.config.js` Playwright configuration and setup project
- `tests/auth.setup.js` authenticated storage-state bootstrap

## Prerequisites

- Node.js 20+ is recommended
- npm
- Valid Sauce Demo credentials

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local `.env` file from `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Fill in the required values:

   ```bash
   BASE_URL=https://www.saucedemo.com/
   TEST_USERNAME=your-username
   TEST_PASSWORD=your-password
   ```

## Running tests

The Playwright config uses a setup project to authenticate once and save browser state to `playwright/.auth/user.json`. The Chromium project depends on that setup state, so the normal test run is:

```bash
npx playwright test
```

Run a single spec file:

```bash
npx playwright test tests/checkout/checkout-complete-page.spec.js
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

## CI

GitHub Actions runs the Playwright suite from [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml) on `push` and `pull_request` events for the `main` and `master` branches.

The workflow expects these repository-level values to be set in GitHub:

- `vars.BASE_URL`
- `secrets.TEST_USERNAME`
- `secrets.TEST_PASSWORD`

At runtime, the workflow passes those values into the job environment so Playwright and the setup test can read them. It then:

1. checks out the repository
2. installs Node dependencies with `npm ci`
3. installs the Chromium browser and OS dependencies for Playwright
4. runs `npx playwright test`
5. uploads `playwright-report/` as a build artifact

## Configuration notes

- `playwright.config.js` reads `.env` with `dotenv`.
- The default `baseURL` is `https://www.saucedemo.com/`.
- Failed tests capture screenshots and traces on retry.
- The test run is configured for authenticated Chromium tests by default.
- Downloads are written to `./downloads/`; the checkout-complete spec expects the order PDF to be saved there.

## Page-object coverage

- `LoginPage` for login and validation errors
- `InventoryPage` for product listing, sorting, and add/remove actions
- `ItemPage` for individual product details
- `CartPage` for cart navigation and checkout entry
- `CheckoutUserDetailsPage` for shipping information and validation
- `CheckoutOverviewPage` for order summary checks and finish flow
- `CheckoutCompletePage` for completion confirmation, back-home navigation, and PDF download

## Example flow

The checkout-complete spec follows the same path the page objects are built for:

1. Open the inventory page
2. Add an item to the cart
3. Open the cart from the header
4. Start checkout
5. Enter shipping details
6. Review the order
7. Finish checkout
8. Verify the completion page and download the PDF

## Notes

- `tests/auth.setup.js` should run before browser tests so storage state exists.
- `utils/testHooks.js` clears `./downloads/` before each test and logs pass/fail status.
