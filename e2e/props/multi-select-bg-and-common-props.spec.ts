import { test, expect } from '@playwright/test';
import {
  getTransformer,
  ComponentWithCategory,
  getShapeBackgroundColor,
  addComponentsWithDifferentCategoriesToCanvas,
  selectAllComponentsInCanvas,
} from '../helpers';

test('when selecting a button and a rectangle, select both, change background color to red, both should update their bg to red', async ({
  page,
}) => {
  await page.goto('');

  // Add components to canvas
  const components: ComponentWithCategory[] = [
    { name: 'Button' }, // Button is in default 'Components' category
    { name: 'Rectangle', category: 'Basic Shapes' },
  ];
  await addComponentsWithDifferentCategoriesToCanvas(page, components);

  // Select all components in canvas
  await selectAllComponentsInCanvas(page);

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
