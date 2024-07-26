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
  | 'timepickerinput';
/* | "text"| "button" |  "radio" | "image"*/
