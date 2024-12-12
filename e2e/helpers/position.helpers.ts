import { Locator, Page } from '@playwright/test';
import { Group } from 'konva/lib/Group';
export interface Position {
  x: number;
  y: number;
}

export const getLocatorPosition = async (
  locator: Locator
): Promise<Position> => {
  await locator.scrollIntoViewIfNeeded();
  const box = (await locator.boundingBox()) || {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
};

export const getCanvasBoundingBox = async (page: Page) => {
  const locator = page.locator('#konva-stage canvas').nth(1);

  // Ensure that the canvas is visible before continuie
  await locator.waitFor({ state: 'visible' });

  const canvasWindowPos = await locator.boundingBox();

  if (canvasWindowPos) {
    return canvasWindowPos;
  } else {
    throw new Error('Canvas is not loaded on UI');
  }
};

export const dragAndDrop = async (
  page: Page,
  aPosition: Position,
  bPosition: Position
): Promise<void> => {
  await page.mouse.move(aPosition.x, aPosition.y);
  await page.mouse.down();
  await page.mouse.move(bPosition.x, bPosition.y);
  await page.mouse.up();
};

export const addComponentsToCanvas = async (
  page: Page,
  components: string[],
  displacementQty: number = 120
) => {
  const stageCanvas = await page.locator('#konva-stage canvas').first();
  const canvasPosition = await stageCanvas.boundingBox();
  if (!canvasPosition) throw new Error('No canvas found');

  for await (const [index, c] of components.entries()) {
    const component = page.getByAltText(c, { exact: true });
    await component.scrollIntoViewIfNeeded();
    const position = await getLocatorPosition(component);

    const targetPosition = (
      displacementQty: number,
      multiplyFactor: number
    ) => {
      const positionDisplacement = displacementQty * (multiplyFactor + 1);
      return {
        x: canvasPosition.x + displacementQty + positionDisplacement,
        y: canvasPosition.y + positionDisplacement,
      };
    };

    await dragAndDrop(page, position, targetPosition(displacementQty, index));
  }
};

export const getShapePosition = async (shape: Group): Promise<Position> => {
  return { x: shape?.attrs.x, y: shape?.attrs.y };
};

export const moveSelected = (
  page: Page,
  direction: string,
  numShifts: number
) => {
  for (let i: number = 0; i < numShifts; i++) page.keyboard.down(direction);
};
