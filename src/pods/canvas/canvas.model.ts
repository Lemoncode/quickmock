import { ShapeType } from '@/core/model';
import { v4 as uuidv4 } from 'uuid';
import {
  getComboBoxShapeSizeRestrictions,
  getInputShapeSizeRestrictions,
  getToggleSwitchShapeSizeRestrictions,
} from '@/common/components/front-components';

export interface Size {
  width: number;
  height: number;
}

export interface Coord {
  x: number;
  y: number;
}

export interface ShapeModel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
}

const getDefaultWidthFromShape = (shapeType: ShapeType): Size => {
  switch (shapeType) {
    case 'combobox':
      return {
        width: getComboBoxShapeSizeRestrictions().defaultWidth,
        height: getComboBoxShapeSizeRestrictions().defaultHeight,
      };
    case 'input':
      return {
        width: getInputShapeSizeRestrictions().defaultWidth,
        height: getInputShapeSizeRestrictions().defaultHeight,
      };
    case 'toggleswitch':
      return {
        width: getToggleSwitchShapeSizeRestrictions().defaultWidth,
        height: getToggleSwitchShapeSizeRestrictions().defaultHeight,
      };
    default:
      return { width: 200, height: 50 };
  }
};

// TODO: create interfaces to hold Coordination and Size
// coordinate: { x: number, y: number }
// size: { width: number, height: number }
export const createShape = (coord: Coord, shapeType: ShapeType): ShapeModel => {
  const { x, y } = coord;
  const { width, height } = getDefaultWidthFromShape(shapeType);

  return {
    id: uuidv4(),
    x,
    y,
    width,
    height,
    type: shapeType,
  };
};

export type ShapeRefs = {
  [key: string]: React.RefObject<any>;
};
