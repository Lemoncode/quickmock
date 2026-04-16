import { test, expect } from '@playwright/test';
import {
  addComponentsToCanvas,
  getByShapeType,
  getByShapeTypeInThumb,
} from '../helpers';
import { Group } from 'konva/lib/Group';

test('should duplicate thumbpage when trigerred via right click', async ({
  page,
}) => {
  await page.goto('');

  // Add components to canvas
  await addComponentsToCanvas(page, ['Button', 'Input']);

  await page.getByText('Pages').click();

  // Find thumb page and right click
  const siblingElement = page.getByText('Page 1', { exact: true });
  const thumb = siblingElement.locator('..');
  await thumb.click({ button: 'right' });

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

  // Additional click to force the duplicate thumbnail to finish rendering.
  await pageTwo.click();
  // Without this click, the React/Konva pipeline does not always update on time and the
  // assertions fail intermittently.

  // Verify components exist in copy thumb
  const buttonInCopyThumb = await getByShapeTypeInThumb(page, 1, 'button');
  const inputInCopyThumb = await getByShapeTypeInThumb(page, 1, 'input');
  expect(buttonInCopyThumb).toBeDefined();
  expect(inputInCopyThumb).toBeDefined();

  // Verify components exist in copy canvas
  const buttonShape = (await getByShapeType(page, 'button')) as Group;
  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(buttonShape).toBeDefined();
  expect(inputShape).toBeDefined();
});
