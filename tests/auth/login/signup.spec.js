// tests/auth/signup.spec.js
const { test, expect } = require('../../../fixtures/baseTest');
const loginPage = require('../../../pages/login/login.page');
const signupPage = require('../../../pages/signup/signup.page');
const data = require('../../../utils/testData');
const signuptestData = require('../../../utils/signuptestData');
const { getSignupUser } = require('../../../utils/dataHelper');
const { expectToast } = require('../../../utils/toastHelper');
const { generateUser } = require('../../../utils/dataGenerator');
const { allure } = require('allure-playwright');

test.describe('Signup Feature', () => {

    test('TC01 - Valid Signup for Hire Talent @smoke', async ({ page, signupPage }) => {
        await allure.description('Verify valid signup');
        await signupPage.goto();
        // Add signup logic here
        await signupPage.clickCreateHireTalentAccount();
        await signupPage.clickCreateAccount();

        await expect(page).toHaveURL(/client/);
        await expect(page.getByText('Find work that suits you — join today.')).toBeVisible();

        const user = getSignupUser();
        await signupPage.fillSignupForm(user);

        await signupPage.checkEmailNotification(true);
        await signupPage.checkTermsAndConditions(true);

        await signupPage.clickSignUp();
        await expect(page.getByText('Registration successful.')).toBeVisible();
        await expect(page).toHaveURL(/dashboard/);

    });

    test('TC02 - Valid Signup for Hire Freelancer @smoke', async ({ page, signupPage }) => {
        await allure.description('Verify valid signup');
        await signupPage.goto();
        // Add signup logic here
        await signupPage.clickCreateFreelancerAccount();
        await signupPage.clickCreateAccount();

        await expect(page).toHaveURL(/freelancer/);
        await expect(page.getByText('Find work that suits you — join today.')).toBeVisible();

        const user = getSignupUser();
        await signupPage.fillSignupForm(user);

        await signupPage.checkEmailNotification(true);
        await signupPage.checkTermsAndConditions(true);

        await signupPage.clickSignUp();
        await expect(page.getByText('Registration successful.')).toBeVisible();
        await expect(page).toHaveURL(/dashboard/);

    });

});