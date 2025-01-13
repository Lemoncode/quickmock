import cloneDeep from 'lodash.clonedeep';
import { ShapeModel } from '@/core/model';
import invariant from 'tiny-invariant';
interface Displacement {
  x: number;
  y: number;
}
interface Viewport {
  xMinVisible: number;
  xMaxVisible: number;
  yMinVisible: number;
  yMaxVisible: number;
}

export const findShapesById = (
  shapeIds: string[],
  shapes: ShapeModel[]
): ShapeModel[] => {
  return shapes.filter(shape => shapeIds.includes(shape.id));
};

export const cloneShapes = (shapes: ShapeModel[]): ShapeModel[] => {
  return shapes.map(shape => cloneDeep(shape));
};

export const cloneShape = (shape: ShapeModel): ShapeModel => {
  return cloneDeep(shape);
};

function areAllShapesFullyVisible(
  shapes: ShapeModel[],
  viewport: Viewport,
  copyCount: number
): boolean {
  return shapes.every(shape => {
    const offsetX = 20 * copyCount;
    const offsetY = 20 * copyCount;
    const newX = shape.x + offsetX;
    const newY = shape.y + offsetY;
    const left = newX;
    const right = newX + shape.width;
    const top = newY;
    const bottom = newY + shape.height;

    return (
      left >= viewport.xMinVisible &&
      right <= viewport.xMaxVisible &&
      top >= viewport.yMinVisible &&
      bottom <= viewport.yMaxVisible
    );
  });
}

export const adjustShapesPosition = (
  shapes: ShapeModel[],
  copyCount: number,
  dropRef: React.MutableRefObject<HTMLDivElement | null>,
  updateClipboardShapes: (shapes: ShapeModel[]) => void
) => {
  const container = dropRef.current;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const scrollLeft = container.scrollLeft;
  const scrollTop = container.scrollTop;

  const viewPort: Viewport = {
    xMinVisible: scrollLeft,
    xMaxVisible: scrollLeft + containerRect.width,
    yMinVisible: scrollTop,
    yMaxVisible: scrollTop + containerRect.height,
  };

  const allVisible = areAllShapesFullyVisible(shapes, viewPort, copyCount);

  if (allVisible) {
    shapes.forEach(shape => {
      adjustShapePosition(shape, copyCount);
    });
  } else {
    const shape0 = shapes[0];
    const oldX0 = shape0.x + 20 * copyCount;
    const oldY0 = shape0.y + 20 * copyCount;

    const centerX = scrollLeft + containerRect.width / 2;
    const centerY = scrollTop + containerRect.height / 2;

    const targetX0 = centerX - shape0.width / 2;
    const targetY0 = centerY - shape0.height / 2;

    const displacement: Displacement = {
      x: targetX0 - oldX0,
      y: targetY0 - oldY0,
    };

    shapes.forEach(shape => {
      adjustShapePosition(shape, copyCount, displacement);
    });
  }

  updateClipboardShapes(shapes);
};

export const adjustShapePosition = (
  shape: ShapeModel,
  copyCount: number,
  d: Displacement = { x: 0, y: 0 }
) => {
  const originalX = shape.x + 20 * copyCount;
  const originalY = shape.y + 20 * copyCount;
  shape.x = originalX + d.x;
  shape.y = originalY + d.y;
};

export const validateShapes = (shapes: ShapeModel[]) => {
  invariant(shapes.length > 0, 'New shapes undefined');
};

export const validateShape = (shape: ShapeModel | null) => {
  invariant(shape, 'New shape undefined');
};
