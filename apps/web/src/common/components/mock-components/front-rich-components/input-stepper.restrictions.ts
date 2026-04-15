import { ShapeSizeRestrictions } from '#core/model';

export const inputStepperShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 80,
  minHeight: 24,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 120,
  defaultHeight: 32,
};

export const getInputStepperShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  inputStepperShapeRestrictions;
