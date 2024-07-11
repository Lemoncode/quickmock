export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  defaultWidth: number;
  defaultHeight: number;
}

export type ShapeType = 'combobox' | 'input' | 'textarea' | 'toggleswitch';
/* | "text"| "button" |  "checkbox" | "radio" | "image"*/
