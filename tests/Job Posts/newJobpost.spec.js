const { test, expect } = require('../../fixtures/baseTest');
const loginPage = require('../../pages/login/login.page');
const data = require('../../utils/testData');
const { expectToast } = require('../../utils/toastHelper');
const { selectDependentDropdown } = require('../../utils/dropdownHelper');
const { allure } = require('allure-playwright');

test.describe('Skillswip Job Posts', () => {

    test('TC01_New Job Post Test', async ({ page }) => {
        await page.goto('/client/dashboard');
        await page.locator('span[title="Job Posts"]').click();
        await expect(page).toHaveURL(/job-post/);
        await page.getByText('Post a new job').click();
        await page.locator('input[name="title"]').fill('Test Job Title');
        await page.getByText('Change category').click();

        await selectDependentDropdown(page, 'Select category', 'Select specialty');
        await page.getByText('Apply').click();

        
    });

});