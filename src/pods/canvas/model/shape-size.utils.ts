import { ShapeSizeRestrictions, ShapeType, Size } from '@/core/model';
import shapeSizeMap from './shape-size.mapper';

export const getSizeRestrictionFromShape = (
  shapeType: ShapeType
): ShapeSizeRestrictions => {
  const getSizeRestriction = shapeSizeMap[shapeType];
  if (getSizeRestriction) {
    return getSizeRestriction();
  } else {
    console.warn(
      `** Shape ${shapeType} has not defined default size, check getDefaultSizeFromShape helper function`
    );
    return {
      minWidth: 200,
      minHeight: 50,
      maxWidth: -1,
      maxHeight: -1,
      defaultWidth: 200,
      defaultHeight: 50,
    };
  }
};

export const getMinSizeFromShape = (shapeType: ShapeType): Size => {
  const { minWidth: width, minHeight: height } =
    getSizeRestrictionFromShape(shapeType);

  return { width, height };
};

export const getDefaultSizeFromShape = (shapeType: ShapeType): Size => {
  const { defaultWidth: width, defaultHeight: height } =
    getSizeRestrictionFromShape(shapeType);

  return { width, height };
};
