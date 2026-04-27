import { expect } from '@playwright/test';

export async function expectToast(page, message) {
  const toast = page.locator('[data-sonner-toast][data-visible="true"][data-front="true"]');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText(message);
}

export async function expectToastType(page, type) {
  const toast = page.locator('[data-sonner-toast][data-visible="true"][data-front="true"]');
  await expect(toast).toHaveAttribute('data-type', type);
}