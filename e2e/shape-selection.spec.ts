import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getByShapeType,
  getLocatorPosition,
  getTransformer,
} from './helpers';
import { Group } from 'konva/lib/Group';

test('no shapes on canvas, transformer not defined', async ({ page }) => {
  await page.goto('');
  const transformer = await getTransformer(page);
  expect(transformer).not.toBeDefined();
});

test('drop shape in canvas, ensure is selected', async ({ page }) => {
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
  expect(transformer.index).toEqual(1);
  expect(transformer._nodes.length).toEqual(1);
});

test('drop shape in canvas, click on canvas, drop diselected', async ({
  page,
}) => {
  await page.goto('');
  const component = page.getByAltText('Input', { exact: true });

  const position = await getLocatorPosition(component);
  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });
  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();

  await page.click('canvas');

  const transformer = await getTransformer(page);
  expect(transformer).toBeDefined();
  expect(transformer.index).toEqual(1);
  expect(transformer._nodes.length).toEqual(0);
});
