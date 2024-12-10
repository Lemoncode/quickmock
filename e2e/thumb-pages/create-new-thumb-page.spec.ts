import { test, expect } from '@playwright/test';

test('create-and-verify-new-thumb-page', async ({ page }) => {
  await page.goto('');

  await page.getByText('Pages').click();

  await expect(page.getByText('Page 2', { exact: true })).toHaveCount(0);

  const addButton = page.getByRole('button', { name: 'add new page' });
  await expect(addButton).toBeVisible();
  await addButton.click();

  const siblingElement = page.getByText('Page 2', { exact: true });
  const thumb = siblingElement.locator('..');
  await expect(thumb).toBeVisible();
});
