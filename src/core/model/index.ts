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
  | 'toggleswitch';
/* | "text"| "button" |  "radio" | "image"*/

export interface ShapeModel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
}
