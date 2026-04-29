// tests/auth/signup.spec.js
const { verifyEmailWithRetry } = require('../../../utils/emailHelper');
const { test, expect } = require('../../../fixtures/baseTest');
const loginPage = require('../../../pages/login/login.page');
const signupPage = require('../../../pages/signup/signup.page');
const data = require('../../../utils/testData');
const signuptestData = require('../../../utils/signuptestData');
const { getSignupUser } = require('../../../utils/dataHelper');
const { expectToast } = require('../../../utils/toastHelper');
const { generateUser, generateCompany } = require('../../../utils/dataGenerator');
const { allure } = require('allure-playwright');

test.describe('Signup Feature', () => {

    test('TC01 - Valid Signup for Hire Talent @smoke', async ({ page, signupPage, request }) => {

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

        // const token = await getEmailVerifyToken(user.email);
        // await page.goto(`${process.env.BASE_URL}/verify-email?token=${token}`);
        await verifyEmailWithRetry(page, user.email);

        await expect(page).toHaveURL(/client\/company-size/);
        await expect(page.getByRole('heading', { name: 'Welcome to Skillswip!' })).toBeVisible();

        const company = generateCompany();
        // await signupPage.selectCompanySize('10_99');
        await signupPage.fillCompanyForm({
            companySize: company.companySize,
            companyName: company.companyName,
            website: company.website,
            country: company.country
        });

        await expect(
            page.getByRole('heading', { name: /welcome, .*let's get your/i })
        ).toBeVisible();

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

        await verifyEmailWithRetry(page, user.email);
        await expect(page).toHaveURL(/signup\/profile-name/);

        await signupPage.selectCountry(data.countries[0]);

        await signupPage.clickContinue();

        await expect(
            page.getByRole('heading', { name: 'Build Your Profile' })
        ).toBeVisible();

        await expect(page).toHaveURL(/signup\/get-started/);

        await signupPage.getStartedButton();

        //A few quick questions: first, have you freelanced before?
        await expect(page.getByRole('heading', { name: 'A few quick questions: first, have you freelanced before?' })).toBeVisible();
        await signupPage.selectExperienceLevel();
        await signupPage.clickNextbutton();

        //And how would you like to work?
        await expect(page.getByRole('heading', { name: 'And how would you like to work?' })).toBeVisible();
        await signupPage.selectWorkPreference();
        await signupPage.clickWorkPreferenceNextButton();

        //How would you like to tell us about yourself?
        await expect(page.getByRole('heading', { name: 'How would you like to tell us about yourself?' })).toBeVisible();
    });

});