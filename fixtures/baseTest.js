// fixtures/baseTest.js
const base = require('@playwright/test');
const { LoginPage } = require('../pages/login/login.page');
const { SignupPage } = require('../pages/signup/signup.page');

exports.test = base.test.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },

});

exports.expect = base.expect;