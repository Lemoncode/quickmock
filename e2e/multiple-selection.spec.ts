import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getCanvasSelectedComponentList,
  addComponentsToCanvas,
} from './helpers';

test('Should perform multiple selection when dragging and dropping over multiple components in the canvas', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input', 'Input', 'Icon', 'Label'];

  await addComponentsToCanvas(page, componentsAtCanvas);

  //Click Away
  await page.mouse.click(800, 130);

  //Select by drag and drop
  await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

  //Assert
  const selectedItems = await getCanvasSelectedComponentList(page);
  expect(selectedItems.length).toBeGreaterThan(componentsAtCanvas.length - 2);
});
