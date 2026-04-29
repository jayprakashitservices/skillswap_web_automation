const { test, expect } = require('../../fixtures/baseTest');
const loginPage = require('../../pages/login/login.page');
const data = require('../../utils/testData');
const { expectToast } = require('../../utils/toastHelper');
const { selectDependentDropdown } = require('../../utils/dropdownHelper');
const { allure } = require('allure-playwright');


test.describe('Skillswip Job Posts', () => {

    test('TC01_New Job Post Test', async ({ loggedInPage }) => {
        await loggedInPage.goto('/client/dashboard');
        await loggedInPage.locator('span[title="Job Posts"]').click();
        await expect(loggedInPage).toHaveURL(/job-post/);
        await loggedInPage.getByText('Post a new job').click();
        await loggedInPage.locator('input[name="title"]').fill('Tosca QA Automation Engineer Needed for E-commerce Project');
        await loggedInPage.getByText('Change category').click();

        await selectDependentDropdown(loggedInPage, 'Select category', 'Select specialty');
        await loggedInPage.getByText('Apply').click();

        await loggedInPage.getByText('Continue').click();

        const skillInput = loggedInPage.locator('input[placeholder="Search or add up to 50 skills"]');

        const selectedSkills = new Set();

        for (let i = 0; i < 5; i++) {

            // ✅ Step 1: Open dropdown every time
            await skillInput.click();

            const dropdown = loggedInPage.locator('div.absolute.bg-white');
            await dropdown.waitFor({ state: 'visible' });

            const options = dropdown.locator('div.cursor-pointer');

            const count = await options.count();

            if (count === 0) throw new Error('❌ No skills found in dropdown');

            let selected = false;

            // ✅ Step 2: Try selecting a unique skill
            for (let j = 0; j < count; j++) {
                const text = await options.nth(j).textContent();

                if (!selectedSkills.has(text)) {
                    selectedSkills.add(text.trim());

                    await options.nth(j).click();
                    selected = true;

                    break;
                }
            }

            if (!selected) {
                console.log('⚠️ No new unique skill found, retrying... - newJobpost.spec.js:59');
                i--; // retry
                continue;
            }

            // ✅ Step 3: Small wait for UI update
            await loggedInPage.waitForTimeout(300);
        }

        await loggedInPage.getByText('Continue').click();

        // Scope
        await loggedInPage.locator('label:has-text("Medium")').click();

        // Duration
        await loggedInPage.locator('label:has-text("3 to 6 months")').click();

        // Experience
        await loggedInPage.locator('label:has-text("Intermediate")').click();

        await expect(loggedInPage.locator('input[value="medium"]')).toBeChecked();

        await loggedInPage.getByText('Continue').click();

        // Select Hourly Rate
        await loggedInPage.getByText('Hourly rate').click();

        // Validate labels
        await expect(loggedInPage.locator('label:has-text("From")')).toBeVisible();
        await expect(loggedInPage.locator('label:has-text("To")')).toBeVisible();

        // Fill values
        const inputs = loggedInPage.locator('input');
        await inputs.nth(0).fill('10');
        await inputs.nth(1).fill('20');

        // // Select Fix Cost
        // await loggedInPage.getByText('Fix cost').click();

        // // Only one input should be visible
        // const costInput = loggedInPage.locator('input').first();

        // await expect(costInput).toBeVisible();
        // await costInput.fill('1000');

        await loggedInPage.getByText('Continue').click();

        // Fill description
        await loggedInPage.locator('textarea[name="description"]')
            .fill('This is a test job description. 71% of small businesses say that LinkedIn helped them find high quality candidates. We want to leverage LinkedIn to find the best talent for our project.');

        // Upload file
        const filePath = 'testFiles/sample.pdf';

        await loggedInPage.locator('input[type="file"]')
            .setInputFiles(filePath);

        // Continue
        await loggedInPage.getByText('Continue').click();

        await loggedInPage.getByText('Publish').click();

            await expectToast(loggedInPage, 'Job updated successfully.');

    });

});