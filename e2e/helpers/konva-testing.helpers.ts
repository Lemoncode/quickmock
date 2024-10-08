import { Page } from '@playwright/test';
import { Layer } from 'konva/lib/Layer';
import { Shape } from 'konva/lib/Shape';
import { Group } from 'konva/lib/Group';
import { Transformer } from 'konva/lib/shapes/Transformer';
import { Node } from 'konva/lib/Node';

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

export const getCanvasSelectedComponentList = async (
  page: Page
): Promise<Node[]> => {
  const layer = await getLayer(page);
  //TODO: find a better way to access Transformer>Nodes.
  const transformer = layer?.children?.at(-2) as Transformer;
  if (!transformer?._nodes) throw new Error('No transformer selection found');
  return transformer._nodes;
};
