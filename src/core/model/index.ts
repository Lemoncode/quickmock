export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export type ShapeType =
  | 'combobox'
  | 'input'
  | 'checkbox'
  | 'toggleswitch' /* | "text"| "button" |  "radio" | "image"*/;
