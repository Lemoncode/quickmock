import { test, expect } from '@playwright/test';
import {
  addComponentsToCanvas,
  getAllByShapeType,
  getIndexFromCanvasShape,
  getShapePosition,
} from '../helpers';
import { Group } from 'konva/lib/Group';

test('drop three shapes in canvas, select one, try all z-index levels', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input', 'Input', 'Input'];
  await addComponentsToCanvas(page, componentsAtCanvas, 30);

  const inputShapes: Group[] = (await getAllByShapeType(
    page,
    'input'
  )) as Group[];
  expect(inputShapes.length).toBe(3);

  // Get Canvas position
  const stageCanvas = await page.locator('#konva-stage canvas').nth(1);
  expect(stageCanvas).toBeDefined();
  const canvasPosition = await stageCanvas.boundingBox();
  if (!canvasPosition) throw new Error('No canvas found');

  // Click on empty canvas space to clear selection
  await page.mouse.click(500, 500);

  // Click on second input shape (will be the test subject)
  const inputShapePosition = await getShapePosition(inputShapes[1]);
  await page.mouse.click(
    canvasPosition.x + inputShapePosition.x + 30,
    canvasPosition.y + inputShapePosition.y + 10
  );

  // Get initial Z-index of all shapes
  const InitialzIndexes: number[] = await Promise.all(
    inputShapes.map(async shape => {
      return await getIndexFromCanvasShape(page, shape._id);
    })
  );
  expect(InitialzIndexes).toEqual([0, 1, 2]);

  // FIRST BUTTON: Move to the top (highest z-index)
  await page.locator('button[aria-label="Bring to front"]').click();

  // Verify Z-index after moving to the top
  const zIndexesAfterMoveToTop: number[] = await Promise.all(
    inputShapes.map(async shape => {
      return await getIndexFromCanvasShape(page, shape._id);
    })
  );
  expect(zIndexesAfterMoveToTop).toEqual([0, 2, 1]); // Second shape is now on top

  // SECOND BUTTON: Move to the bottom (lowest z-index)
  await page.locator('button[aria-label="Send to back"]').click();

  // Verify Z-index after moving to the bottom
  const zIndexesAfterMoveToBottom: number[] = await Promise.all(
    inputShapes.map(async shape => {
      return await getIndexFromCanvasShape(page, shape._id);
    })
  );
  expect(zIndexesAfterMoveToBottom).toEqual([1, 0, 2]); // Second shape is now at the bottom

  // THIRD BUTTON: Move up one level
  await page.locator('button[aria-label="Bring forward"]').click();

  // Verify Z-index after moving up one level
  const zIndexesAfterMoveUp: number[] = await Promise.all(
    inputShapes.map(async shape => {
      return await getIndexFromCanvasShape(page, shape._id);
    })
  );
  expect(zIndexesAfterMoveUp).toEqual([0, 1, 2]); // Second shape moved up one level

  // FOURTH BUTTON: Move down one level
  await page.locator('button[aria-label="Send backward"]').click();

  // Verify Z-index after moving down one level
  const zIndexesAfterMoveDown: number[] = await Promise.all(
    inputShapes.map(async shape => {
      return await getIndexFromCanvasShape(page, shape._id);
    })
  );
  expect(zIndexesAfterMoveDown).toEqual([1, 0, 2]); // Second shape moved down one level again
});
