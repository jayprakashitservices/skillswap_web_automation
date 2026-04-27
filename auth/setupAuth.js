require('dotenv').config();

const { chromium } = require('@playwright/test');
const { LoginPage } = require('../pages/login/login.page');
const data = require('../utils/testData');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const loginPage = new LoginPage(page);

  // ✅ FIX HERE
  await page.goto(`${process.env.BASE_URL}/login`);

  await loginPage.login(data.validUser.email, data.validUser.password);

  await page.waitForURL('**/dashboard');

  await context.storageState({ path: 'auth/user.json' });

  console.log('✅ Auth state saved! - setupAuth.js:23');

  await browser.close();
})();