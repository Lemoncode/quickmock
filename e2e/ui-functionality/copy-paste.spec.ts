import { test, expect } from '@playwright/test';
import {
  addComponentsToCanvas,
  dragAndDrop,
  getWithinCanvasItemList,
} from '../helpers';
import { E2E_CanvasItemKeyAttrs } from '../helpers/types/e2e-types';
import {
  clickCopyUiButton,
  clickPasteUiButton,
} from '../helpers/ui-buttons.helpers';

test.describe('Copy/Paste functionality tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Should copy and paste a single shape using the ToolBar UI buttons', async ({
    page,
  }) => {
    //Arrange one Input component
    const addInputIntoCanvas = ['Input'];
    await addComponentsToCanvas(page, addInputIntoCanvas);

    //Copy and assert there are only one component within the canvas
    await clickCopyUiButton(page);
    const insideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    expect(insideCanvasItemList.length).toEqual(1);

    //Paste and assert there are 2 Input Components and that they have different IDs
    await clickPasteUiButton(page);
    const updatedInsideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    const [originalComponent, copiedComponent] = updatedInsideCanvasItemList;

    expect(updatedInsideCanvasItemList.length).toEqual(2);
    expect(originalComponent.shapeType).toEqual(copiedComponent.shapeType);
    expect(originalComponent['data-id']).not.toEqual(
      copiedComponent['data-id']
    );
  });

  test('Should copy and paste a single shape using keyboard commands', async ({
    page,
  }) => {
    // NOTE: This test has the same steps as the previous one, except for the keyboard commands.
    //Arrange one Input component
    const addInputIntoCanvas = ['Input'];
    await addComponentsToCanvas(page, addInputIntoCanvas);

    //Copy and assert there are only one component within the canvas
    await page.keyboard.press('ControlOrMeta+c');
    const insideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    expect(insideCanvasItemList.length).toEqual(1);

    //Paste and assert there are 2 Input Components and that they have different IDs
    await page.keyboard.press('ControlOrMeta+v');
    const updatedInsideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    const [originalComponent, copiedComponent] = updatedInsideCanvasItemList;

    expect(updatedInsideCanvasItemList.length).toEqual(2);
    expect(originalComponent.shapeType).toEqual(copiedComponent.shapeType);
    expect(originalComponent['data-id']).not.toEqual(
      copiedComponent['data-id']
    );
  });

  /*
  test('Should copy and paste a multiple shapes using the ToolBar UI buttons', async ({
    page,
  }) => {
    //Add several components into the canvas
    const addInputIntoCanvas = ['Input', 'Combobox', 'Icon'];
    await addComponentsToCanvas(page, addInputIntoCanvas);

    //Select items by drag and drop
    await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

    //Copy and assert there are 3 components within the canvas
    await clickCopyUiButton(page);
    const insideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    const [originalComp_1, originalComp_2, originalComp_3] =
      insideCanvasItemList;
    expect(insideCanvasItemList.length).toEqual(3);

    //Paste
    await clickPasteUiButton(page);
    const updatedInsideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    const [, , , copiedComp_1, copiedComp_2, copiedComp_3] =
      updatedInsideCanvasItemList;

    //Assert there are 6 Components,
    expect(updatedInsideCanvasItemList.length).toEqual(6);

    //Assert they match the same shapes respectively
    expect(originalComp_1.shapeType).toEqual(copiedComp_1.shapeType);
    expect(originalComp_2.shapeType).toEqual(copiedComp_2.shapeType);
    expect(originalComp_3.shapeType).toEqual(copiedComp_3.shapeType);

    //Assert they have different IDs
    expect(originalComp_1['data-id']).not.toEqual(copiedComp_1['data-id']);
    expect(originalComp_2['data-id']).not.toEqual(copiedComp_2['data-id']);
    expect(originalComp_3['data-id']).not.toEqual(copiedComp_3['data-id']);
  });
*/
  test('Should copy and paste a multiple shapes using keyboard commands', async ({
    page,
  }) => {
    // NOTE: This test has the same steps as the previous one, except for the keyboard commands.
    //Add several components into the canvas
    const addInputIntoCanvas = ['Input', 'Combobox', 'Icon'];
    await addComponentsToCanvas(page, addInputIntoCanvas);

    //Select items by drag and drop
    await dragAndDrop(page, { x: 260, y: 130 }, { x: 1000, y: 550 });

    //Copy and assert there are 3 components within the canvas
    await page.keyboard.press('ControlOrMeta+c');
    const insideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    const [originalComp_1, originalComp_2, originalComp_3] =
      insideCanvasItemList;
    expect(insideCanvasItemList.length).toEqual(3);

    //Paste
    await page.keyboard.press('ControlOrMeta+v');
    const updatedInsideCanvasItemList = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];
    const [, , , copiedComp_1, copiedComp_2, copiedComp_3] =
      updatedInsideCanvasItemList;

    //Assert there are 6 Components,
    expect(updatedInsideCanvasItemList.length).toEqual(6);

    //Assert they match the same shapes respectively
    expect(originalComp_1.shapeType).toEqual(copiedComp_1.shapeType);
    expect(originalComp_2.shapeType).toEqual(copiedComp_2.shapeType);
    expect(originalComp_3.shapeType).toEqual(copiedComp_3.shapeType);

    //Assert they have different IDs
    expect(originalComp_1['data-id']).not.toEqual(copiedComp_1['data-id']);
    expect(originalComp_2['data-id']).not.toEqual(copiedComp_2['data-id']);
    expect(originalComp_3['data-id']).not.toEqual(copiedComp_3['data-id']);
  });
});
