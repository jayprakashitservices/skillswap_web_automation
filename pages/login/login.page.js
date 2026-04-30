const {BasePage} = require('../login/base.page');
const locators = require('./login.locators');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
  }

  async goto() {
    const baseURL = process.env.BASE_URL || 'http://192.168.1.18:3001/';
    await this.page.goto(`${baseURL}`);
  }

  async clickLogin() {
    await this.page.getByRole('link', { name: 'Log In' }).click();
    await this.page.waitForURL(/login/);
    //await this.click(locators.loginLink);
  }

  async enterEmail(email) {
    await this.fill(locators.emailInput, email);
  }

  async enterPassword(password) {
    await this.fill(locators.passwordInput, password);
  }

  async clickSignIn() {
    await this.click(locators.signInButton);
  }

  async clickForgotPassword() {
    await this.click(locators.forgotPasswordLink);
  }

  async clickSignUp() {
    await this.click(locators.signupLink);
  }

  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }
}

module.exports = { LoginPage };