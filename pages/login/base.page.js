class BasePage {
  constructor(page) {
    if (!page) {
      throw new Error('❌ Page is not initialized in BasePage');
    }
    this.page = page;
  }

  getByTestId(testId) {
    console.log('TEST ID: - base.page.js:10', testId); // 👈 add this
    return this.page.getByTestId(testId);
  }

  async fill(testId, value) {
    const el = this.getByTestId(testId);
    await el.waitFor({ state: 'visible' });
    await el.fill(value);
  }

  async click(testId) {
    const el = this.getByTestId(testId);
    await el.waitFor({ state: 'visible' });
    await el.click();
  }

  async waitForVisible(testId) {
    await this.getByTestId(testId).waitFor({ state: 'visible' });
  }
}

module.exports = { BasePage };