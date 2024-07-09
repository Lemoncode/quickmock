export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export type ShapeType =
  | 'combobox'
  | 'input'
  | 'button' /*| "text" |  "checkbox" | "radio" | "image"*/;
