import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { Size } from './canvas.model';
import {
  getComboBoxShapeSizeRestrictions,
  getInputShapeSizeRestrictions,
  getToggleSwitchShapeSizeRestrictions,
} from '@/common/components/front-components';

// TODO Add Unit tests, issue: #45
export const fitSizeToShapeSizeRestrictions = (
  shapeSizeRestrictions: ShapeSizeRestrictions,
  width: number,
  height: number
): Size => {
  const newWidth =
    shapeSizeRestrictions.maxWidth !== -1
      ? Math.min(shapeSizeRestrictions.maxWidth, width)
      : width;

  const newHeight =
    shapeSizeRestrictions.maxHeight !== -1
      ? Math.min(shapeSizeRestrictions.maxHeight, height)
      : height;

  return {
    width: Math.max(newWidth, shapeSizeRestrictions.minWidth),
    height: Math.max(newHeight, shapeSizeRestrictions.minHeight),
  };
};

const defaultShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 0,
  minHeight: 0,
  maxWidth: -1,
  maxHeight: -1,
};

// TODO: Add unit test support: #46
export const getShapeSizeRestrictions = (type: ShapeType | null) => {
  if (!type) {
    return defaultShapeSizeRestrictions;
  }

  switch (type) {
    case 'combobox':
      return getComboBoxShapeSizeRestrictions();
    case 'input':
      return getInputShapeSizeRestrictions();
    case 'toggleswitch':
      return getToggleSwitchShapeSizeRestrictions();
    default:
      return defaultShapeSizeRestrictions;
  }
};
