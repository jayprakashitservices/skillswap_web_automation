async function openPage(page, url) {
  await page.goto(url);
  return "Page opened";
}

async function click(page, selector) {
  await page.click(selector);
  return `Clicked ${selector}`;
}

async function type(page, selector, text) {
  await page.fill(selector, text);
  return `Typed in ${selector}`;
}

async function getText(page, selector) {
  return await page.textContent(selector);
}

module.exports = { openPage, click, type, getText };