import { Coord, ShapeType, Size, ShapeModel } from '@/core/model';
import { v4 as uuidv4 } from 'uuid';

import {
  getComboBoxShapeSizeRestrictions,
  getInputShapeSizeRestrictions,
  getListboxShapeSizeRestrictions,
  getTextAreaSizeRestrictions,
  getToggleSwitchShapeSizeRestrictions,
  getProgressBarShapeSizeRestrictions,
  getDatepickerInputShapeSizeRestrictions,
  getButtonShapeSizeRestrictions,
  getTimepickerInputShapeSizeRestrictions,
} from '@/common/components/front-components';
import {
  getBrowserWindowShapeSizeRestrictions,
  getMobilePhoneShapeSizeRestrictions,
  getTabletShapeSizeRestrictions,
} from '@/common/components/front-containers';
import { getLabelSizeRestrictions } from '@/common/components/front-components/label-shape';

export const SNAP_THRESHOLD = 5;

export type SnapLines = {
  vertical: number[];
  horizontal: number[];
};

export type SnapType = 'center' | 'start' | 'end';

export interface SnapEdge {
  guide: number;
  offset: number;
  snap: SnapType;
}

export type SnapEdges = {
  vertical: SnapEdge[];
  horizontal: SnapEdge[];
};

const getDefaultSizeFromShape = (shapeType: ShapeType): Size => {
  switch (shapeType) {
    case 'label':
      return {
        width: getLabelSizeRestrictions().defaultWidth,
        height: getLabelSizeRestrictions().defaultHeight,
      };
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
    case 'textarea':
      return {
        width: getTextAreaSizeRestrictions().defaultWidth,
        height: getTextAreaSizeRestrictions().defaultHeight,
      };
    case 'datepickerinput':
      return {
        width: getDatepickerInputShapeSizeRestrictions().defaultWidth,
        height: getDatepickerInputShapeSizeRestrictions().defaultHeight,
      };
    case 'button':
      return {
        width: getButtonShapeSizeRestrictions().defaultWidth,
        height: getButtonShapeSizeRestrictions().defaultHeight,
      };
    case 'progressbar': {
      return {
        width: getProgressBarShapeSizeRestrictions().defaultWidth,
        height: getProgressBarShapeSizeRestrictions().defaultHeight,
      };
    }
    case 'listbox':
      return {
        width: getListboxShapeSizeRestrictions().defaultWidth,
        height: getListboxShapeSizeRestrictions().defaultHeight,
      };
    case 'browser':
      return {
        width: getBrowserWindowShapeSizeRestrictions().defaultWidth,
        height: getBrowserWindowShapeSizeRestrictions().defaultHeight,
      };
    case 'mobilePhone':
      return {
        width: getMobilePhoneShapeSizeRestrictions().defaultWidth,
        height: getMobilePhoneShapeSizeRestrictions().defaultHeight,
      };
    case 'tablet':
      return {
        width: getTabletShapeSizeRestrictions().defaultWidth,
        height: getTabletShapeSizeRestrictions().defaultHeight,
      };
    case 'timepickerinput':
      return {
        width: getTimepickerInputShapeSizeRestrictions().defaultWidth,
        height: getTimepickerInputShapeSizeRestrictions().defaultHeight,
      };

    default:
      return { width: 200, height: 50 };
  }
};

const doesShapeAllowInlineEdition = (shapeType: ShapeType): boolean => {
  switch (shapeType) {
    case 'input':
    case 'label':
      return true;
    default:
      return false;
  }
};

const generateDefaultTextValue = (shapeType: ShapeType): string | undefined => {
  switch (shapeType) {
    case 'input':
      return '';
    case 'label':
      return 'Label';
    default:
      return undefined;
  }
};

// TODO: create interfaces to hold Coordination and Size
// coordinate: { x: number, y: number }
// size: { width: number, height: number }
export const createShape = (coord: Coord, shapeType: ShapeType): ShapeModel => {
  const { x, y } = coord;
  const { width, height } = getDefaultSizeFromShape(shapeType);

  return {
    id: uuidv4(),
    x,
    y,
    width,
    height,
    type: shapeType,
    allowsInlineEdition: doesShapeAllowInlineEdition(shapeType),
    text: generateDefaultTextValue(shapeType),
  };
};
