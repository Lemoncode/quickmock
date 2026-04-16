import { ShapeSizeRestrictions } from '#core/model';

export const MouseCursorSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 25,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 150,
  defaultHeight: 150,
};

export const getMouseCursorShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  MouseCursorSizeRestrictions;
