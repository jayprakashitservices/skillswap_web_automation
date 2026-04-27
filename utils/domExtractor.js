async function getDOM(page) {
  return await page.content();
}

module.exports = { getDOM };