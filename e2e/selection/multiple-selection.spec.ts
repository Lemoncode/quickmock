import { test, expect } from '@playwright/test';
import { dragAndDrop, addComponentsToCanvas, getTransformer } from '../helpers';

test('Should perform multiple selection when dragging and dropping over multiple components in the canvas', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input', 'Input', 'Icon', 'Label'];
  await addComponentsToCanvas(page, componentsAtCanvas);

  //Click Away
  await page.mouse.click(800, 130);

  //Perform items selection by drag and drop
  await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

  //Assert
  const selectedItems = await getTransformer(page);
  expect(selectedItems._nodes.length).toEqual(3);
});

test('Should deselect all previously selected items when clicking on an empty point on the canvas', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input', 'Input', 'Icon', 'Label'];
  await addComponentsToCanvas(page, componentsAtCanvas);

  //Click Away
  await page.mouse.click(800, 130);

  //Perform items selection by drag and drop
  await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

  //Assert
  const selectedItems = await getTransformer(page);
  expect(selectedItems._nodes.length).toEqual(3);

  //Click Away
  await page.mouse.click(800, 130);
  //Assert
  const updatedSelectedItems = await getTransformer(page);
  expect(updatedSelectedItems._nodes.length).toEqual(0);
});
