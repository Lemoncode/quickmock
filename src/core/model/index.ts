export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export type ShapeType =
  | 'combobox'
  | 'input'
  | 'toggleswitch' /* | "text"| "button" |  "checkbox" | "radio" | "image"*/;
