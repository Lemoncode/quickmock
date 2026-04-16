import { ShapeSizeRestrictions } from '#core/model';

export const modalDialogShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 250,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 300,
};

export const getModalDialogShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalDialogShapeSizeRestrictions;
