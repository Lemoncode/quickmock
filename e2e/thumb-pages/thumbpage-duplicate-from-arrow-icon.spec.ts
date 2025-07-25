import { test, expect } from '@playwright/test';
import {
  addComponentsToCanvas,
  getByShapeType,
  getByShapeTypeInThumb,
} from '../helpers';
import { Group } from 'konva/lib/Group';

test('should duplicate thumbpage when triggered via the arrow icon', async ({
  page,
}) => {
  await page.goto('');

  // Add components to canvas
  await addComponentsToCanvas(page, ['Button', 'Combobox']);

  await page.getByText('Pages').click();

  // Find thumb page
  const siblingElement = page.getByText('Page 1', { exact: true });
  const thumb = siblingElement.locator('..');

  // Select arrow svg inside the thumb container
  const svgElement = thumb.locator('span > svg');
  await svgElement.click();

  // Verify duplicate button exists in the context menu
  const duplicateButton = page
    .locator('div')
    .filter({ hasText: /^Duplicate$/ });

  await expect(duplicateButton).toBeVisible();

  // Duplicate thumbpage
  await duplicateButton.click();

  // Verify Page 1 - copy exists and its selected
  const pageTwo = page
    .getByText('Page 1 - copy', { exact: true })
    .locator('..');
  await expect(pageTwo).toBeVisible();

  // Verify components exist in copy thumb
  const buttonInCopyThumb = await getByShapeTypeInThumb(page, 1, 'button');
  const comboboxInCopyThumb = await getByShapeTypeInThumb(page, 1, 'combobox');
  expect(buttonInCopyThumb).toBeDefined();
  expect(comboboxInCopyThumb).toBeDefined();

  // Verify components exist in copy canvas
  const buttonShape = (await getByShapeType(page, 'button')) as Group;
  const comboboxShape = (await getByShapeType(page, 'combobox')) as Group;
  expect(buttonShape).toBeDefined();
  expect(comboboxShape).toBeDefined();
});
