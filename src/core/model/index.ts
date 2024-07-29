export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  defaultWidth: number;
  defaultHeight: number;
}

export type ShapeType =
  | 'combobox'
  | 'input'
  | 'button'
  | 'checkbox'
  | 'textarea'
  | 'toggleswitch'
  | 'datepickerinput'
  | 'browser'
  | 'timepickerinput';
/* | "text"| "button" |  "radio" | "image"*/

export interface Size {
  width: number;
  height: number;
}

export interface Coord {
  x: number;
  y: number;
}
