import { test, expect } from '@playwright/test';
import { dragAndDrop, getByShapeType, getLocatorPosition } from '../helpers';

test('when selecting a new thumb and adding a new shape it will be dropped in the new created page', async ({
  page,
}) => {
  await page.goto('');

  await page.getByText('Devices').click();

  // Drag & drop mobile device component to default page canvas
  const componentFirstPage = page
    .getByText('Mobile Phone', { exact: true })
    .locator('..');

  const position = await getLocatorPosition(componentFirstPage);
  const targetPosition = { x: position.x + 500, y: position.y - 200 };
  await dragAndDrop(page, position, targetPosition);

  // Add new page
  await page.getByText('Pages').click();
  const addButton = page.getByRole('button', { name: 'add new page' });
  await addButton.click();

  // Verify Page 2 is automatically selected/active
  const pageTwo = page.getByText('Page 2', { exact: true }).locator('..');
  await expect(pageTwo).toHaveClass(/active/);

  // Drag & drop browser component to second page canvas
  await page.getByText('Devices').click();
  const componentSecondPage = page
    .getByText('Browser', { exact: true })
    .locator('..');

  const position2 = await getLocatorPosition(componentSecondPage);
  const targetPosition2 = { x: position2.x + 400, y: position2.y };
  await dragAndDrop(page, position2, targetPosition2);

  await page.getByText('Pages').click();

  // Verify if browser is in page 2 (current selected page)
  const browser = await getByShapeType(page, 'browser');
  expect(browser).toBeDefined();

  // Switch to page 1
  const pageOne = page.getByText('Page 1', { exact: true }).locator('..');
  await pageOne.click();

  // Verify if in page 1: mobile visible, browser not visible
  const mobile = await getByShapeType(page, 'mobilePhone');
  const browserInPage1 = await getByShapeType(page, 'browser');

  expect(mobile).toBeDefined();
  expect(browserInPage1).toBeUndefined();

  // Add button to page 1 to verify shapes are added to correct active page
  await page.getByText('Components', { exact: true }).click();
  const button = page.getByAltText('Button', { exact: true });

  const position3 = await getLocatorPosition(button);
  const targetPosition3 = { x: position.x + 500, y: position.y - 100 };
  await dragAndDrop(page, position3, targetPosition3);

  // Verify button was added to canvas in page 1
  const buttonInCanvas = await getByShapeType(page, 'button');
  expect(mobile).toBeDefined();
  expect(buttonInCanvas).toBeDefined();
});
