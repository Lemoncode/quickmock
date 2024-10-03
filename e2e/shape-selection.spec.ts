import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getByShapeType,
  getLocatorPosition,
  getTransformer,
} from './helpers';
import { Group } from 'konva/lib/Group';

test('drop shape ensure is selected', async ({ page }) => {
  await page.goto('');
  const component = page.getByAltText('Input', { exact: true });

  const position = await getLocatorPosition(component);
  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();

  const transformer = await getTransformer(page);
  expect(transformer).toBeDefined();
  expect(transformer.attrs.enabledAnchors).not.toEqual([]);
});
