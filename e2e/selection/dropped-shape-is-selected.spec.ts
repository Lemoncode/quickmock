import { test, expect, Locator } from '@playwright/test';
import {
  dragAndDrop,
  getByShapeType,
  getLocatorPosition,
  getTransformer,
  getAllByShapeType,
} from '../helpers';
import { Group } from 'konva/lib/Group';

test('drop new shape in canvas, ensure new is selected, former is unselected - different shapes', async ({
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

  const transformer = await getTransformer(page);
  expect(transformer).toBeDefined();
  expect(transformer.index).toEqual(1);
  expect(transformer._nodes.length).toEqual(1);

  const component2 = page.getByAltText('Label', { exact: true });
  expect(component2).toBeDefined();

  const offset = 200;

  const position2 = await getLocatorPosition(component2);
  await dragAndDrop(page, position2, {
    x: position2.x + 500 + offset,
    y: position2.y - 240 + offset,
  });

  const inputShape2 = (await getByShapeType(page, 'label')) as Group;
  expect(inputShape2).toBeDefined();

  const transformer2 = await getTransformer(page);
  expect(transformer2).toBeDefined();
  expect(transformer2.index).toEqual(2);
  expect(transformer2._nodes.length).toEqual(1);
});

test('drop new shape in canvas, ensure new is selected, former is unselected - same shapes', async ({
  page,
}) => {
  await page.goto('');

  const component = page.getByAltText('Input', { exact: true });

  const position = await getLocatorPosition(component);
  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShapes: Group[] = (await getAllByShapeType(
    page,
    'input'
  )) as Group[];
  expect(inputShapes[0]).toBeDefined();

  const transformer = await getTransformer(page);
  expect(transformer).toBeDefined();
  expect(transformer.index).toEqual(1);
  expect(transformer._nodes.length).toEqual(1);

  const component2 = page.getByAltText('Input', { exact: true });
  expect(component2).toBeDefined();

  const offset = 200;

  const position2 = await getLocatorPosition(component2);
  await dragAndDrop(page, position2, {
    x: position2.x + 500 + offset,
    y: position2.y - 240 + offset,
  });

  const inputShapes2: Group[] = (await getAllByShapeType(
    page,
    'input'
  )) as Group[];
  expect(inputShapes2[1]).toBeDefined();
  expect(inputShapes2.length).toEqual(2);

  const transformer2 = await getTransformer(page);
  expect(transformer2).toBeDefined();
  expect(transformer2.index).toEqual(2);
  expect(transformer2._nodes.length).toEqual(1);
});
