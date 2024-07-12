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
  | 'checkbox'
  | 'textarea'
  | 'toggleswitch' /* | "text"| "button" |  "radio" | "image"*/;
