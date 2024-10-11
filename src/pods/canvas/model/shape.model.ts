import { Coord, ShapeType, ShapeModel, OtherProps } from '@/core/model';
import { v4 as uuidv4 } from 'uuid';
import { generateTypeOfTransformer } from './transformer.model';
import {
  doesShapeAllowInlineEdition,
  generateDefaultTextValue,
  getShapeEditInlineType,
} from './inline-editable.model';
import { getDefaultSizeFromShape } from './shape-size.utils';
import { generateDefaultOtherProps } from './shape-other-props.utils';

export const createShape = (
  coord: Coord,
  shapeType: ShapeType,
  otherProps?: OtherProps
): ShapeModel => {
  const { x, y } = coord;
  const { width, height } = getDefaultSizeFromShape(shapeType);

  const defaultProps = generateDefaultOtherProps(shapeType);

  return {
    id: uuidv4(),
    x,
    y,
    width,
    height,
    type: shapeType,
    allowsInlineEdition: doesShapeAllowInlineEdition(shapeType),
    typeOfTransformer: generateTypeOfTransformer(shapeType),
    text: generateDefaultTextValue(shapeType),
    editType: getShapeEditInlineType(shapeType),
    otherProps: otherProps ? { ...defaultProps, ...otherProps } : defaultProps,
  };
};
