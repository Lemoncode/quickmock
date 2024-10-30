import { Locator, Page } from '@playwright/test';
import { Group } from 'konva/lib/Group';

interface Position {
  x: number;
  y: number;
}

export const getLocatorPosition = async (
  locator: Locator
): Promise<Position> => {
  const box = (await locator.boundingBox()) || {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
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
  components: string[]
) => {
  const canvas = await page.locator('canvas');
  const canvasPosition = await canvas.boundingBox();
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
    const currentComponent = targetPosition(120, index);
    console.log(currentComponent);

    // if (canvasPosition.width < currentComponent.x || canvasPosition.height < currentComponent.y) {
    //   console.log('he pasado el límite');
    // } else {
    //   console.log('no he pasado el límite');
    // }

    await dragAndDrop(page, position, currentComponent);
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
