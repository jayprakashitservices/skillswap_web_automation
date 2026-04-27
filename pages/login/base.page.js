class BasePage {
  constructor(page) {
    this.page = page;
  }

  getByTestId(testId) {
    return this.page.getByTestId(testId);
  }

  async fill(testId, value) {
    await this.getByTestId(testId).fill(value);
  }

  async click(testId) {
    await this.getByTestId(testId).click();
  }

  async waitForVisible(testId) {
    await this.getByTestId(testId).waitFor({ state: 'visible' });
  }
}

module.exports = { BasePage };