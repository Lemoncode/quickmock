import { test, expect } from '@playwright/test';
import { addComponentsToCanvas } from '../helpers';

test('should delete one of the created thumb pages and just 2 thumb pages should remain', async ({
  page,
}) => {
  await page.goto('');

  // Add a browser component to first page
  await page.getByText('Devices').click();

  await addComponentsToCanvas(page, ['Browser']);

  // Add a second page
  await page.getByText('Pages').click();
  const addButton = page.getByRole('button', { name: 'add new page' });
  await addButton.click();

  // Add mobile phone component to second page

  await page.getByText('Devices').click();

  await addComponentsToCanvas(page, ['Mobile Phone']);

  // Add a third page

  await page.getByText('Pages').click();

  await addButton.click();

  // Add a tablet component to third page

  await page.getByText('Devices').click();

  await addComponentsToCanvas(page, ['Tablet']);

  // Delete page 2
  await page.getByText('Pages').click();

  const pageTwo = page.getByText('Page 2', { exact: true });
  const thumbTwoDiv = pageTwo.locator('..');
  await thumbTwoDiv.click({ button: 'right' });

  const deleteButton = page.locator('div').filter({ hasText: /^Delete$/ });

  await deleteButton.click();

  // Verify page 2 does not exist

  expect(pageTwo).not.toBeVisible();

  // Verify page 1 and 3 exist

  const pageOne = page.getByText('Page 1', { exact: true });

  const pageThree = page.getByText('Page 3', { exact: true });

  await expect(pageOne).toBeVisible();
  await expect(pageThree).toBeVisible();

  // Verify total pages

  const allPages = page.getByText(/^Page \d+$/);
  await expect(allPages).toHaveCount(2);
});
