import { test, expect } from '@playwright/test';

test('rename-thumb-page-through-direct-edit-and-context-menu', async ({
  page,
}) => {
  await page.goto('');

  await page.getByText('Pages').click();
  const thumb = page.getByText('Page 1', { exact: true });
  await expect(thumb).toBeVisible();
  await expect(thumb).toHaveText('Page 1');

  await thumb.dblclick();
  const input = page.getByRole('textbox');
  const newTextContent = 'Change the name';
  await input.fill(newTextContent);
  await page.keyboard.press('Enter');
  const renamedPage = page.getByText(newTextContent, { exact: true });
  await expect(renamedPage).toBeVisible();

  const siblingElement = page.getByText('Change the name', { exact: true });
  const divThumb = siblingElement.locator('..');
  await divThumb.click({ button: 'right' });
  await page.getByText('Rename').click();

  const secondNewTextContent = 'Other name';
  await expect(input).toBeVisible();
  await input.fill(secondNewTextContent);
  await page.keyboard.press('Enter');
  const secondRenamedPage = page.getByText(secondNewTextContent, {
    exact: true,
  });
  await expect(secondRenamedPage).toBeVisible();
});
