// fixtures/baseTest.js
const base = require('@playwright/test');
const { LoginPage } = require('../pages/login/login.page');
const { SignupPage } = require('../pages/signup/signup.page');
const data = require('../utils/testData');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

  // ✅ NEW: Auto Login Fixture
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(data.validUser.email, data.validUser.password);

    await page.waitForURL(/dashboard/); // ensure login success

    await use(page);
  }

});

exports.expect = base.expect;