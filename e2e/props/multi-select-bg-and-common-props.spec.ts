import { test, expect } from '@playwright/test';
import { dragAndDrop, getLocatorPosition, getTransformer } from '../helpers';
import { getShapeBackgroundColor } from '../helpers';

test('when selecting a button and a rectangle, select both, change background color to red, both should update their bg to red', async ({
  page,
}) => {
  await page.goto('');

  // Drag & drop button in canvas
  const button = page.getByAltText('Button', { exact: true });

  const position = await getLocatorPosition(button);
  const targetPosition = { x: position.x + 500, y: position.y };
  await dragAndDrop(page, position, targetPosition);

  // Drag & drop rectangle in canvas
  await page.getByText('Basic Shapes').click();
  const rectangle = page.getByText('Rectangle', { exact: true }).locator('..');

  const position2 = await getLocatorPosition(rectangle);
  const targetPosition2 = { x: position2.x + 500, y: position2.y - 100 };
  await dragAndDrop(page, position2, targetPosition2);

  await page.mouse.click(800, 130);

  // Perform items selection
  await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

  // Confirm both items are selected
  const selectedItems = await getTransformer(page);
  expect(selectedItems._nodes.length).toEqual(2);

  // Change background color to red
  const bgSelector = page
    .getByText('Background')
    .locator('..')
    .locator('button');
  await bgSelector.click();

  const redColorBox = page.locator(
    'div[style*="background-color: rgb(221, 0, 0)"]'
  );
  await redColorBox.click();

  // Verify that both items have red background
  const buttonBgColor = await getShapeBackgroundColor(page, 'button');
  const rectangleBgColor = await getShapeBackgroundColor(page, 'rectangle');

  expect(buttonBgColor).toBe('#DD0000');
  expect(rectangleBgColor).toBe('#DD0000');
});
