import { test, expect } from '@playwright/test';
import {
  dragAndDrop,
  addComponentsToCanvas,
  getTransformer,
  getWithinCanvasItemList,
  ctrlClickOverCanvasItems,
} from '../helpers';

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

test('Should add some in-canvas-items to the current selection, by clicking on them, while pressing the CTRL / CMD keyboard.', async ({
  page,
}) => {
  await page.goto('');

  //Drag and drop component to canvas
  const componentsAtCanvas = ['Input', 'Button', 'Textarea', 'Combobox'];
  await addComponentsToCanvas(page, componentsAtCanvas);
  const insideCanvasItemList = await getWithinCanvasItemList(page);

  //Assert no elements at current selection
  const selectedItems = await getTransformer(page);
  expect(selectedItems._nodes.length).toEqual(1);

  // Add 2 canvas items to current selection
  const itemsToBeSelected = insideCanvasItemList.slice(1, 3);
  await ctrlClickOverCanvasItems(page, itemsToBeSelected);

  //Assert the quantity of selected-items
  const currentSelection = await getTransformer(page);
  expect(currentSelection._nodes.length).toEqual(3);
});

test('Should selected multiple items when we doing drag and drop event and then CMD/CTRL+Click then check that we have 4 elements selected', async ({
  page,
}) => {
  await page.goto('');

  const componentsAtCanvas = [
    'Input',
    'Button',
    'Textarea',
    'Combobox',
    'Icon',
    'Label',
  ];
  await addComponentsToCanvas(page, componentsAtCanvas);
  const insideCanvasItemList = await getWithinCanvasItemList(page);

  //Click Away
  await page.mouse.click(800, 130);

  //Perform items selection by drag and drop
  await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

  //Assert
  const selectedItems = await getTransformer(page);
  expect(selectedItems._nodes.length).toEqual(3);

  // Add 2 canvas items to current selection
  const itemsToBeSelected = insideCanvasItemList.slice(3, 4);
  await ctrlClickOverCanvasItems(page, itemsToBeSelected);

  //Assert the quantity of selected-items
  const currentSelection = await getTransformer(page);
  expect(currentSelection._nodes.length).toEqual(4);
});
