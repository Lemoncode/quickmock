import { ShapeType } from '@/core/model';
import { getDefaultSizeFromShape } from './model';

// TODO: #156 Add unit tests to this funcion
export const calculateShapeOffsetToXDropCoordinate = (
  cordinateX: number,
  shapeType: ShapeType
): number => {
  const defaultShapeSize = getDefaultSizeFromShape(shapeType);
  const offset = defaultShapeSize.width / 2;

  return cordinateX - offset > 0 ? offset : 0;
};
