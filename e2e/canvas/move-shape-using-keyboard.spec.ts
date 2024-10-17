import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getLocatorPosition,
  getByShapeType,
  getShapePosition,
  moveSelected,
} from '../helpers';
import { Group } from 'konva/lib/Group';

const numShifts: number = 10;

test('move shape with the keyboard - left', async ({ page }) => {
  await page.goto('');

  const component = page.getByAltText('Input', { exact: true });
  const position = await getLocatorPosition(component);

  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();

  const draggedPosition = await getShapePosition(inputShape);

  moveSelected(page, 'ArrowLeft', numShifts);

  const inputShapeMoved = (await getByShapeType(page, 'input')) as Group;
  const movedPosition = await getShapePosition(inputShapeMoved);

  expect(movedPosition.x === draggedPosition.x - numShifts * 2).toBeTruthy();
  expect(movedPosition.y === draggedPosition.y).toBeTruthy();
});

test('move shape with the keyboard - up', async ({ page }) => {
  await page.goto('');

  const component = page.getByAltText('Input', { exact: true });
  const position = await getLocatorPosition(component);

  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();

  const draggedPosition = await getShapePosition(inputShape);

  moveSelected(page, 'ArrowUp', numShifts);

  const inputShapeMoved = (await getByShapeType(page, 'input')) as Group;
  const movedPosition = await getShapePosition(inputShapeMoved);

  expect(movedPosition.x === draggedPosition.x).toBeTruthy();
  expect(movedPosition.y === draggedPosition.y - numShifts * 2).toBeTruthy();
});

test('move shape with the keyboard - down', async ({ page }) => {
  await page.goto('');

  const component = page.getByAltText('Input', { exact: true });
  const position = await getLocatorPosition(component);

  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();

  const draggedPosition = await getShapePosition(inputShape);

  moveSelected(page, 'ArrowDown', numShifts);

  const inputShapeMoved = (await getByShapeType(page, 'input')) as Group;
  const movedPosition = await getShapePosition(inputShapeMoved);

  expect(movedPosition.x === draggedPosition.x).toBeTruthy();
  expect(movedPosition.y === draggedPosition.y + numShifts * 2).toBeTruthy();
});

test('move shape with the keyboard - right', async ({ page }) => {
  await page.goto('');

  const component = page.getByAltText('Input', { exact: true });
  const position = await getLocatorPosition(component);

  await dragAndDrop(page, position, {
    x: position.x + 500,
    y: position.y - 240,
  });

  const inputShape = (await getByShapeType(page, 'input')) as Group;
  expect(inputShape).toBeDefined();

  const draggedPosition = await getShapePosition(inputShape);

  moveSelected(page, 'ArrowRight', numShifts);

  const inputShapeMoved = (await getByShapeType(page, 'input')) as Group;
  const movedPosition = await getShapePosition(inputShapeMoved);

  expect(movedPosition.x === draggedPosition.x + numShifts * 2).toBeTruthy();
  expect(movedPosition.y === draggedPosition.y).toBeTruthy();
});
