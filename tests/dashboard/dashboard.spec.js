const { test, expect } = require('../../fixtures/baseTest');
const loginPage = require('../../pages/login/login.page');
const data = require('../../utils/testData');
const { expectToast } = require('../../utils/toastHelper');
const { allure } = require('allure-playwright');

test.describe('Skillswip Dashboard', () => {

    test('TC01_Dashboard Test', async ({ page }) => {
        await page.goto('/client/dashboard');
        await expect(page).toHaveURL(/dashboard/);
    });

});