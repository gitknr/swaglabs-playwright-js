import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend({
    // Define an automatic fixture (auto: true)
    logTitleFixture: [async ({}, use, testInfo) => {
        // This runs BEFORE the test
        console.log(`🚀 Starting test: ${testInfo.title}`);

        await use(); // This placeholder executes the actual test

        // Optional: add code here if you want to run something AFTER the test
        if (testInfo.status === 'passed') {
            console.log(`✅ Successfully verified test: ${testInfo.title}`);
        } else {
            // Optional: Log failure/skip details
            console.warn(`❌ Failed or Skipped test: ${testInfo.title}. Status: ${testInfo.status}`);
        }

    }, { auto: true }],
});

export { expect } from '@playwright/test';
