const { chromium } = require('@playwright/test');
const { getDOM } = require('./utils/domExtractor');
const { generateTest } = require('./ai/agents/testGenerator');
const { runAgent } = require('./ai/agents/mcpAgent');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://your-app-url.com/login');

  const dom = await getDOM(page);

  await generateTest(dom);

  await browser.close();
})();