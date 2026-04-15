import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getByShapeTypeInThumb,
  getLocatorPosition,
} from '../helpers';

test('drop button in canvas, ensure is visible on thumb', async ({ page }) => {
  await page.goto('');

  // Drag & drop button in canvas
  const button = page.getByAltText('Button', { exact: true });
  await expect(button).toBeVisible();

  const position = await getLocatorPosition(button);
  const targetPosition = { x: position.x + 500, y: position.y };
  await dragAndDrop(page, position, targetPosition);

  // Open Pages panel
  await page.getByText('Pages').click();

  // Verify button is visible in thumb
  const buttonInThumb = await getByShapeTypeInThumb(page, 0, 'button');
  expect(buttonInThumb).toBeDefined();
});
