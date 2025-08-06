import { test, expect } from '@playwright/test';

test('when there is just one thumb page active, delete thumb page button has to be disabled', async ({
  page,
}) => {
  await page.goto('');

  // Open Pages panel
  await page.getByText('Pages').click();

  // Add two more pages
  const addButton = page.getByRole('button', { name: 'add new page' });
  await addButton.click();
  await addButton.click();

  // Delete page 3
  const deleteButton = page.locator('div').filter({ hasText: /^Delete$/ });

  const pageThree = page.getByText('Page 3', { exact: true });
  expect(pageThree).toBeVisible();
  const thumbThreeDiv = pageThree.locator('..');
  await thumbThreeDiv.click({ button: 'right' });
  await deleteButton.click();

  // Delete page 2
  const pageTwo = page.getByText('Page 2', { exact: true });
  expect(pageTwo).toBeVisible();
  const thumbTwoDiv = pageTwo.locator('..');
  await thumbTwoDiv.click({ button: 'right' });
  await deleteButton.click();

  // Try to delete page 1
  const pageOne = page.getByText('Page 1', { exact: true });
  expect(pageOne).toBeVisible();
  const thumbOneDiv = pageOne.locator('..');
  await thumbOneDiv.click({ button: 'right' });

  // Check if delete button is disabled
  await expect(deleteButton).toHaveClass(/disabled/);
});
