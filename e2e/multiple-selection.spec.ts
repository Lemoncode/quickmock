import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  getLocatorPosition,
  getCanvasSelectedComponentList,
} from './helpers';

test('Should perform multiple selection when dragging and dropping over multiple components in the canvas', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input'];
  const component = page.getByAltText(componentsAtCanvas[0], { exact: true });
  const position = await getLocatorPosition(component);
  const targetPosition = {
    x: position.x + 500,
    y: position.y - 240,
  };
  await dragAndDrop(page, position, targetPosition);

  //Click Away
  await page.mouse.click(800, 130);

  //Do select using drag and drop
  await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 600 });

  //Assert
  const selectedItems = await getCanvasSelectedComponentList(page);
  expect(selectedItems).toHaveLength(componentsAtCanvas.length);
});
