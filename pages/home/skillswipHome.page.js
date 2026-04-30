const { BasePage } = require('../login/base.page');
const locators = require('../home/homePage.locators');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
    }

    async clickLogin() {
        await this.click(locators.loginLink);
    }

    async clickSignup() {
        await this.click(locators.signupLink);
    }
}

module.exports = { HomePage };