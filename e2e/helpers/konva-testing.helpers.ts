import { Page } from '@playwright/test';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { Group } from 'konva/lib/Group';
import { E2E_CanvasItemKeyAttrs } from './types/e2e-types';
import { getCanvasBoundingBox } from './position.helpers';

const getLayer = async (page: Page): Promise<Layer> =>
  await page.evaluate(() => {
    return window.__TESTING_KONVA_LAYER__;
  });

const getChildren = async (page: Page): Promise<(Group | Shape)[]> => {
  const layer = await getLayer(page);
  return layer?.children.flatMap(child =>
    Boolean((child as any)?.children) ? (child as any).children : child
  );
};

export const getAllByShapeType = async (
  page: Page,
  shape: string
): Promise<(Group | Shape)[]> => {
  const children = await getChildren(page);
  const shapes = children?.filter(child => child.attrs.shapeType === shape);
  if (shapes.length === 0) {
    throw new Error(`No shapes found with shapeType ${shape}`);
  } else {
    return shapes;
  }
};

export const getByShapeType = async (
  page: Page,
  shape: string
): Promise<Group | Shape | undefined> => {
  const children = await getChildren(page);
  const count = children?.filter(
    child => child.attrs.shapeType === shape
  )?.length;

  if (count === 1) {
    return children.find(child => child.attrs.shapeType === shape);
  } else if (count > 1) {
    throw new Error(
      `Found ${count} shapes with shapeType ${shape} you should use getAllByShapeType`
    );
  } else {
    return undefined;
  }
};

export const getTransformer = async (page: Page): Promise<any> => {
  const layer = await getLayer(page);
  const transformer = layer?.children.find((child: any) => {
    // Ensure that canvas has an element dropped, selected or not
    return (
      child._nodes?.length > 0 ||
      (child._nodes?.length === 0 && child.index > 0)
    );
  });
  return transformer;
};

export const getWithinCanvasItemList = async (
  page: Page
): Promise<Group['attrs'][]> => {
  const items = await page.evaluate(() => {
    return window.__TESTING_KONVA_LAYER__.find(
      (c: any) => c.getType('Group') && (c.attrs['data-id'] as Group)
    );
  });
  return items.map(it => it.attrs);
};

export const clickOnCanvasItem = async (
  page: Page,
  item: E2E_CanvasItemKeyAttrs
) => {
  const { x, y } = item;
  const canvasWindowPos = await getCanvasBoundingBox(page);
  await page.mouse.move(
    canvasWindowPos?.x + x + 20,
    canvasWindowPos?.y + y + 20
  );

  await page.mouse.down();
  await page.mouse.up();

  return item;
};

export const dbClickOnCanvasItem = async (
  page: Page,
  item: E2E_CanvasItemKeyAttrs
) => {
  const { x, y } = item;
  const canvasWindowPos = await getCanvasBoundingBox(page);
  await page.mouse.dblclick(
    canvasWindowPos?.x + x + 20,
    canvasWindowPos?.y + y + 20
  );
  return item;
};

export const ctrlClickOverCanvasItems = async (
  page: Page,
  itemList: E2E_CanvasItemKeyAttrs[]
) => {
  if (!itemList.length)
    throw new Error('Please, add an array with at least one canvas Item');
  // NOTE: The keyboard entry 'ControlOrMeta' is the way to simulate both 'Ctrl' or 'Command' key
  await page.keyboard.down('ControlOrMeta');
  for (const item of itemList) {
    await clickOnCanvasItem(page, item);
  }
  await page.keyboard.up('ControlOrMeta');
};
