import { Locator, Page } from '@playwright/test';

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
