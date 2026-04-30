const { BasePage } = require('../login/base.page');
const locators = require('./forgotPassword.locators');

class ForgotPasswordPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async enterEmail(email) {
        await this.fill(locators.forgotPasswordEmailInput, email);
    }

    async clickResetPasswordButton() {
        await this.click(locators.forgotPasswordSubmitButton);
    }
}

module.exports = { ForgotPasswordPage };