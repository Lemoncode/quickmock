import { test, expect } from '@playwright/test';
import { Group } from 'konva/lib/Group';
import { dragAndDrop, getByShapeType, getLocatorPosition } from './helpers';

test('has Basic Shapes group', async ({ page }) => {
  await page.goto('');

  await expect(page.getByText('Basic Shapes')).toBeVisible();
});

test('has rectangle component', async ({ page }) => {
  await page.goto('');
  await page.getByText('Basic Shapes').click();

  await expect(page.getByAltText('Rectangle')).toBeVisible();
});

test('can add rectangle component to canvas', async ({ page }) => {
  await page.goto('');
  await page.getByText('Basic Shapes').click();
  const component = page.getByAltText('Rectangle');

  const position = await getLocatorPosition(component);
  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const rectangle = (await getByShapeType(page, 'rectangle')) as Group;
  expect(rectangle).toBeDefined();
  expect(rectangle.attrs.width).toEqual(160);
  expect(rectangle.attrs.height).toEqual(160);
});
