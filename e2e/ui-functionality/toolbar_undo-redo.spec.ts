import { test, expect } from '@playwright/test';
import {
  addComponentsToCanvas,
  getWithinCanvasItemList,
  getByShapeType,
  dbClickOnCanvasItem,
  getCanvasBoundingBox,
  getShapePosition,
} from '../helpers';
import { E2E_CanvasItemKeyAttrs } from '../helpers/types/e2e-types';
import { Group } from 'konva/lib/Group';
import {
  clickRedoUiButton,
  clickUndoUiButton,
} from '../helpers/ui-buttons.helpers';

test.describe('ToolBar buttons Undo/Redo functionality tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  test('Should remove and restore a just dragged into canvas-item, respectively', async ({
    page,
  }) => {
    //Arrange
    const addInputIntoCanvas = ['Input'];
    await addComponentsToCanvas(page, addInputIntoCanvas);

    //Undo and check within canvas items
    await clickUndoUiButton(page);
    const insideCanvasItemList = await getWithinCanvasItemList(page);

    expect(insideCanvasItemList.length).toEqual(0);

    //Redo and check existing item within canvas
    await clickRedoUiButton(page);
    const updatedInsideCanvasItemList = await getWithinCanvasItemList(page);

    expect(updatedInsideCanvasItemList.length).toEqual(1);
  });

  test('Should remove and restore the last item you just dragged into the canvas', async ({
    page,
  }) => {
    //Arrange
    const addComponentsIntoCanvas = ['Input', 'Combobox'];
    await addComponentsToCanvas(page, addComponentsIntoCanvas);

    //Undo and assert there is only one Item within canvas
    await clickUndoUiButton(page);
    const insideCanvasItemList = await getWithinCanvasItemList(page);

    expect(insideCanvasItemList.length).toEqual(1);

    const firsCanvastItem = await getByShapeType(page, 'input');
    expect(firsCanvastItem).toBeDefined();

    //Redo and assert both items are contained within the canvas
    await clickRedoUiButton(page);
    const updatedInsideCanvasItemList = await getWithinCanvasItemList(page);
    const secondCanvasItem = await getByShapeType(page, 'combobox');

    expect(updatedInsideCanvasItemList.length).toEqual(2);
    expect(firsCanvastItem).toBeDefined();
    expect(secondCanvasItem).toBeDefined();
  });

  test('Should reverse and restore an edited text of an Input Component', async ({
    page,
  }) => {
    //Arrange data and drag an input
    const addComponentsIntoCanvas = ['Input'];
    const defaultInputPlaceholder = 'Placeholder';
    const updatedText = 'Hello';

    await addComponentsToCanvas(page, addComponentsIntoCanvas);
    const [inputOnCanvas] = (await getWithinCanvasItemList(
      page
    )) as E2E_CanvasItemKeyAttrs[];

    //Start Input component inline editing
    await dbClickOnCanvasItem(page, inputOnCanvas);
    const editableInput = page.locator('input[data-is-inline-edition-on=true]');
    const defaultInputValue = await editableInput.inputValue();

    await editableInput.fill(updatedText);
    const updatedInputValue = await editableInput.inputValue();

    //Undo edit and assert text is reversed
    await clickUndoUiButton(page);
    expect(defaultInputValue).toEqual(defaultInputPlaceholder);

    //Redo edit and assert that input contains the restored updated text
    await clickRedoUiButton(page);
    expect(updatedInputValue).toEqual(updatedText);
  });

  test('Should restore the item position to its previous placement', async ({
    page,
  }) => {
    //Arrange data and drag an input into canvas
    const componentToAddintoCanvas = ['Input'];
    await addComponentsToCanvas(page, componentToAddintoCanvas);

    const { x: canvasXStart, y: canvasYStart } =
      await getCanvasBoundingBox(page);

    const inputElement = (await getByShapeType(page, 'input')) as Group;

    const inputInitialPosition = await getShapePosition(inputElement);
    const inputModifiedPosition = {
      x: inputInitialPosition.x + canvasXStart + 200,
      y: inputInitialPosition.y + canvasYStart,
    };

    //Displace item within the canvas
    await page.mouse.down();
    await page.mouse.move(inputModifiedPosition.x, inputModifiedPosition.y);
    await page.mouse.up();

    //Undo and assert that the item is placed in its initial position
    await clickUndoUiButton(page);
    const finalInputPosition = await getShapePosition(inputElement);

    expect(finalInputPosition).toEqual(inputInitialPosition);
  });

  test('Should undo and redo, backward and forward severals steps consistently', async ({
    page,
  }) => {
    //Arrange data and drag an items into canvas
    const componentsToAddIntoCanvas = ['Input', 'Combobox'];
    await addComponentsToCanvas(page, componentsToAddIntoCanvas);

    await page.getByText('Rich Components').click();
    const richComponentsToAddintoCanvas = ['Accordion'];
    await addComponentsToCanvas(page, richComponentsToAddintoCanvas);

    //Assert there are 3 items within the canvas
    const itemsQtyWithinCanvas_step1 = (await getWithinCanvasItemList(page))
      .length;

    expect(itemsQtyWithinCanvas_step1).toEqual(3);

    //x3 undo
    await clickUndoUiButton(page);
    await clickUndoUiButton(page);
    await clickUndoUiButton(page);

    //Assert there are no items within the canvas
    const itemsQtyWithinCanvas_step2 = (await getWithinCanvasItemList(page))
      .length;

    expect(itemsQtyWithinCanvas_step2).toEqual(0);

    //x3 redo
    await clickRedoUiButton(page);
    await clickRedoUiButton(page);
    await clickRedoUiButton(page);

    //Assert there are again 3 items within the canvas
    const itemsQtyWithinCanvas_step3 = (await getWithinCanvasItemList(page))
      .length;
    expect(itemsQtyWithinCanvas_step3).toEqual(3);
  });
});
