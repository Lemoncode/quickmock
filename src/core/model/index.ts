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
  | 'progressbar'
  | 'listbox'
  | 'datepickerinput'
  | 'browser'
  | 'timepickerinput'
  | 'mobilePhone'
  | 'tablet'
  | 'timepickerinput'
  | 'label'
  | 'radiobutton'
  | 'rectangle'
  | 'videoPlayer'
  | 'diamond'
  | 'line'
  | 'accordion'
  | 'pie'
  | 'map'
  | 'circle'
  | 'star';

export type EditType = 'input' | 'textarea';

export type ShapeRefs = {
  [key: string]: React.RefObject<any>;
};

export interface Size {
  width: number;
  height: number;
}

export interface Coord {
  x: number;
  y: number;
}

export interface ShapeModel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
  allowsInlineEdition: boolean;
  hasLateralTransformer: boolean;
  editType?: EditType;
  text?: string;
}
