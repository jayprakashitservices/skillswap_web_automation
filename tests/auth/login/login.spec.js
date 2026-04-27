// tests/auth/login.spec.js
const { test, expect } = require('../../../fixtures/baseTest');
const loginPage = require('../../../pages/login/login.page');
const data = require('../../../utils/testData');
const { expectToast } = require('../../../utils/toastHelper');
const { allure } = require('allure-playwright');

test.describe('Login Feature', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('TC01 - Valid Login @smoke', async ({ page, loginPage }) => {
    await allure.description('Verify valid login');
    await loginPage.login(data.validUser.email, data.validUser.password);
    await expect(page.getByText('Login Successfully.')).toBeVisible();
    await expect(page).toHaveURL(/dashboard/);
  });

  test.skip('TC02 - Empty Email || Empty email and password', async ({ loginPage }) => {
    await loginPage.enterPassword(data.validUser.password);
    await loginPage.clickSignIn();
    await expect(loginPage.page.locator('text=Email is required')).toBeVisible();
  });

  test.skip('TC03 - Invalid email format', async ({ page, loginPage }) => {
    await loginPage.login(data.invalidUser.email, data.invalidUser.password);
    await loginPage.clickSignIn();
    await expectToast(page, 'Invalid email address.');
  });

  test.skip('TC04 - Invalid credentials', async ({ page, loginPage }) => {
    await loginPage.login(data.userNotfound.email, data.userNotfound.password);
    await loginPage.clickSignIn();
    await expectToast(page, 'user not found.');
  });

  test.skip('TC05 - Empty password', async ({ page, loginPage }) => {
    await loginPage.login(data.userNotfound.email, data.emptyData.password);
    await loginPage.clickSignIn();
    await expectToast(page, 'Password is required.');
  });

  test.skip('TC06 - Forgot password link', async ({ page, loginPage }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/forgot-password/);
  });

  test.skip('TC07 - Sign up link', async ({ page, loginPage }) => {
    await loginPage.clickSignUp();
    await expect(page).toHaveURL(/signup/);
  });

});