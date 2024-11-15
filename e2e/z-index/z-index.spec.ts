import { test, expect } from '@playwright/test';
import {
  addComponentsToCanvas,
  getAllByShapeType,
  getShapePosition,
} from '../helpers';
import { Group } from 'konva/lib/Group';

test('drop two shapes in canvas, select one, try all z-index levels', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input', 'Input'];
  await addComponentsToCanvas(page, componentsAtCanvas, 25);

  //Click Away
  await page.mouse.click(800, 130);

  const inputShapes: Group[] = (await getAllByShapeType(
    page,
    'input'
  )) as Group[];
  expect(inputShapes).toBeDefined();

  // Select first shape
  const firstShape = inputShapes[0];
  const firstShapePosition = await getShapePosition(firstShape);
  await page.mouse.click(firstShapePosition.x, firstShapePosition.y);
});
