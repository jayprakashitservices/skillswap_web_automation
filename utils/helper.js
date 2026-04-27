// utils/helper.js
class Helper {

  static async waitForAPI(page, urlPart) {
    return await page.waitForResponse(resp =>
      resp.url().includes(urlPart) && resp.status() === 200
    );
  }

  static async takeScreenshot(page, name) {
    await page.screenshot({ path: `reports/${name}.png` });
  }

}

module.exports = { Helper };