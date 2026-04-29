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

    async getStartedButton() {
        await this.click(locators.getStartedButton);
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

    async selectCompanySize(sizeKey) {
        const map = {
            justMe: '#number_of_employee_just_me',
            '2_9': '#number_of_employee_2_to_9',
            '10_99': '#number_of_employee_10_to_99',
            '100_1000': '#number_of_employee_100_to_999',
            '1000_plus': '#number_of_employee_1000_plus'
        };

        const selector = map[sizeKey];

        if (!selector) {
            throw new Error(`Invalid company size key: ${sizeKey}`);
        }

        const radio = this.page.locator(selector);

        await radio.waitFor({ state: 'visible' });
        await radio.check();
    }

    async enterCompanyName(name) {
        const input = this.page.locator('[name="company_details.company_name"]');
        await input.waitFor({ state: 'visible' });
        await input.fill(name);
    }
    async enterWebsite(site) {
        const input = this.page.locator('[name="company_details.website"]');
        await input.waitFor({ state: 'visible' });
        await input.fill(site);
    }

    async selectCountry(country) {
        // Open dropdown
        const dropdown = this.page.getByText('Select a country');

        await dropdown.waitFor({ state: 'visible' });
        await dropdown.click();

        // Select country
        const option = this.page.getByRole('option', { name: country, exact: true });

        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async clickContinue() {
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async fillCompanyForm(data) {
        await this.selectCompanySize(data.companySize);
        await this.enterCompanyName(data.companyName);
        await this.enterWebsite(data.website);
        await this.selectCountry(data.country);
        await this.clickContinue();
    }

    async selectExperienceLevel() {
        const options = ['Beginner', 'Intermediate', 'Expert'];

        const randomOption = options[Math.floor(Math.random() * options.length)];

        const radio = this.page.locator(`[role="radio"][value="${randomOption}"]`);
        await radio.waitFor({ state: 'visible' });
        await radio.click();

        console.log('Selected: - signup.page.js:153', randomOption);
    }

    async clickNextbutton() {
        await this.click(locators.nextButton);
    }

    async selectWorkPreference() {
        const options = ['self-find', 'package-work'];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        const radio = this.page.locator(`[role="radio"][value="${randomOption}"]`);
        await radio.waitFor({ state: 'visible' });
        await radio.click();
    }

    async clickWorkPreferenceNextButton() {
        await this.click(locators.workPreferenceNextButton);
    }

}
module.exports = { SignupPage };