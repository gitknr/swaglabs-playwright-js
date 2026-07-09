import { test as baseTest } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const downloadsDir = './downloads';

export const test = baseTest.extend({
    // eslint-disable-next-line no-empty-pattern
    logTitleFixture: [async ({}, use, testInfo) => {
        // Clean downloads directory
        await fs.mkdir(downloadsDir, { recursive: true });

        const files = await fs.readdir(downloadsDir);

        await Promise.all(
            files.map(file =>
                fs.rm(path.join(downloadsDir, file), { force: true })
            )
        );

        console.log(`🚀 Starting test: ${testInfo.title}`);

        await use();

        if (testInfo.status === 'passed') {
            console.log(`✅ Successfully verified test: ${testInfo.title}`);
        } else {
            console.warn(`❌ Failed or Skipped test: ${testInfo.title}. Status: ${testInfo.status}`);
        }
    }, { auto: true }],
});

export { expect } from '@playwright/test';