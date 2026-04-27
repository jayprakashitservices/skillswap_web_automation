// utils/dropdownHelper.js
const { expect } = require('@playwright/test');

async function selectDependentDropdown(page, parentText, childText) {
  const dialog = page.getByRole('dialog');

  // Select parent dropdown
  await dialog.locator('button[role="combobox"]', { hasText: parentText }).click();

  const parentOptions = page.locator('[role="option"]');
  const parentCount = await parentOptions.count();
  const parentIndex = Math.floor(Math.random() * parentCount);

  await parentOptions.nth(parentIndex).click();

  // Wait for child dropdown reset
  const child = dialog.locator('button[role="combobox"]', { hasText: childText });
  await expect(child).toContainText(childText);

  // Open child dropdown
  await child.click();

  const childOptions = page.locator('[role="option"]');
  const childCount = await childOptions.count();
  const childIndex = Math.floor(Math.random() * childCount);

  await childOptions.nth(childIndex).click();
}

module.exports = { selectDependentDropdown };