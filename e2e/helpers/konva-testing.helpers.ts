import { Page } from '@playwright/test';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { Group } from 'konva/lib/Group';

const getLayer = async (page: Page): Promise<Layer> =>
  await page.evaluate(() => {
    const layer = (window as any).KONVA_LAYER;
    return layer;
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