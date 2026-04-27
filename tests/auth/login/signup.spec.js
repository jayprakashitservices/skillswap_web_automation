// tests/auth/signup.spec.js
const { test, expect } = require('../../../fixtures/baseTest');
const loginPage = require('../../../pages/login/login.page');
const signupPage = require('../../../pages/signup/signup.page');
const data = require('../../../utils/testData');
const signuptestData = require('../../../utils/signuptestData');
const { expectToast } = require('../../../utils/toastHelper');
const { allure } = require('allure-playwright');

test.describe('Signup Feature', () => {

    test.beforeEach(async ({ signupPage }) => {
        await signupPage.goto();
    });

    test('TC01 - Valid Signup for Hire Talent @smoke', async ({ page, signupPage }) => {
        await allure.description('Verify valid signup');
        // Add signup logic here
        await signupPage.clickCreateHireTalentAccount();
        await signupPage.clickCreateAccount();

        await expect(page.getByText('Find work that suits you — join today.')).toBeVisible();
        await expect(page).toHaveURL(/client/);

        await signupPage.fillSignupForm(signuptestData.signup.validUser);
        await signupPage.clickCreateAccount();
        await expect(page.getByText('Account created successfully. Please check your email to verify your account.')).toBeVisible();

    });

});