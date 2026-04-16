import { ShapeSizeRestrictions } from '#core/model';

export const calendarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 350,
  minHeight: 350,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 500,
};

export const getCalendarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  calendarShapeSizeRestrictions;
