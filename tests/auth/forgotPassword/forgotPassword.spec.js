const { test, expect } = require('../../../fixtures/baseTest');
const data = require('../../../utils/testData');
const { expectToast } = require('../../../utils/toastHelper');
const { allure } = require('allure-playwright');
const locators = require('../../../pages/login/forgotPassword.locators');

test.describe('Forgot Password Functionality', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.clickLogin();
    });

    test('TC01 - Forgot Password @smoke', async ({ page, loginPage, forgotPasswordPage }) => {
        await allure.description('Verify forgot password link navigates to the correct page');
        
        await loginPage.clickForgotPassword();
        await expect(page).toHaveURL(/forgot-password/);

        await expect(page.getByTestId(locators.forgotPasswordTitle)).toBeVisible();
        await forgotPasswordPage.enterEmail(data.validUser.email);
        await forgotPasswordPage.clickResetPasswordButton();
        await expectToast(page, 'Password reset link sent to your email.'); 

    });

});