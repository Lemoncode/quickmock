export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
}

export type ShapeType =
  | 'combobox'
  | 'input'
  | 'checkbox' /* | "text"| "button" | "radio" | "image"*/;
