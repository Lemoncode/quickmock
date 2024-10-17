import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getLocatorPosition,
  getByShapeType,
  getShapePosition,
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

  for (let i: number = 0; i < numShifts; i++) page.keyboard.down('ArrowLeft');

  const inputShapeMoved = (await getByShapeType(page, 'input')) as Group;
  const movedPosition = await getShapePosition(inputShapeMoved);

  expect(movedPosition.x === draggedPosition.x - numShifts * 2).toBeTruthy();
  expect(movedPosition.y === draggedPosition.y).toBeTruthy();
});
