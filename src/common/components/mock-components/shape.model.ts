// Important: we extend from Shapeconfig so we can get additional shape params
// TODO: we will need to add more props like for instance text content

import { OtherProps, ShapeType } from '@/core/model';
import { ShapeConfig } from 'konva/lib/Shape';

// but we have to check how to pass it to the shape (there will be different types of shapes)
export interface ShapeProps extends ShapeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onSelected: (
    id: string,
    type: ShapeType,
    userIsMultipleSelecting: boolean
  ) => void;
  otherProps?: OtherProps;
}
