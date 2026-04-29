const { test, expect } = require('../../fixtures/baseTest');
const { allure } = require('allure-playwright');

test.describe('Skillswip Dashboard', () => {

    test('TC01 - Dashboard after login @smoke', async ({ loggedInPage }) => {
        await allure.description('Verify user lands on dashboard after login');

        await expect(loggedInPage).toHaveURL(/dashboard/);
        await expect(loggedInPage.getByText('Dashboard')).toBeVisible();
    });

    test('TC02 - Direct navigation (unauthenticated)', async ({ page }) => {
        await page.goto('/client/dashboard');

        // Expect redirect to login
        await expect(page).toHaveURL(/login/);
    });

});