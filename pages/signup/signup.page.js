const { BasePage } = require('../login/base.page');
const locators = require('./signup.locators');


class SignupPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async goto() {
        const baseURL = process.env.BASE_URL || 'http://192.168.1.18:3001/';
        await this.page.goto(`${baseURL}/signup`);
    }

    async clickCreateHireTalentAccount() {
        await this.click(locators.hireTalent);
    }

    async clickCreateFreelancerAccount() {
        await this.click(locators.freelancer);
    }

    async clickLoginLink() {
        await this.click(locators.login);
    }

    async clickSignUp() {
        await this.click(locators.signupbtn);
    }

    async clickCreateAccount() {
        await this.click(locators.createAccountbtn);
    }

    async fillSignupForm({ firstName, lastName, email, password }) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    async enterFirstName(firstName) {
        await this.fill(locators.firstName, firstName);
    }

    async enterLastName(lastName) {
        await this.fill(locators.lastName, lastName);
    }

    async enterEmail(email) {
        await this.fill(locators.email, email);
    }

    async enterPassword(password) {
        await this.fill(locators.password, password);
    }

    async checkEmailNotification(shouldCheck = true) {
        const checkbox = this.getByTestId(locators.signupemailnotificationCheckbox);

        await checkbox.waitFor({ state: 'visible' });

        const isChecked = await checkbox.isChecked();

        if (shouldCheck !== isChecked) {
            await checkbox.click();
        }
    }

    async checkTermsAndConditions(shouldCheck = true) {
        const checkbox = this.getByTestId(locators.signuptermsCheckbox);

        await checkbox.waitFor({ state: 'visible' });

        const isChecked = await checkbox.isChecked();

        if (shouldCheck !== isChecked) {
            await checkbox.click();
        }
    }
}

module.exports = { SignupPage };