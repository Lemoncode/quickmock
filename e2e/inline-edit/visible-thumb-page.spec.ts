import { test, expect } from '@playwright/test';

test('verifies visibility of thumb page, chevron and add new page button', async ({
  page,
}) => {
  await page.goto('');

  await page.getByText('Pages').click();

  const siblingElement = page.getByText('Page 1', { exact: true });
  const thumb = siblingElement.locator('..');
  await expect(thumb).toBeVisible();

  const svgElement = thumb.locator('span > svg');
  await expect(svgElement).toBeVisible();

  const addButton = page.getByRole('button', { name: 'add new page' });
  await expect(addButton).toBeVisible();
});
