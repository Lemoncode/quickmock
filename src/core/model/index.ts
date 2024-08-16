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
  | 'postit'
  | 'videoPlayer'
  | 'diamond'

  /* | "text"| "button" |  "radio" | "image"*/
  | 'line'
  | 'accordion'
  | 'pie'
  | 'horizontal-menu'
  | 'breadcrumb'
  | 'map'
  | 'circle'
  | 'star'
  | 'largeArrow'
  | 'triangle';

export const ShapeDisplayName: Record<ShapeType, string> = {
  combobox: 'Combobox',
  input: 'Input',
  button: 'Button',
  checkbox: 'Checkbox',
  textarea: 'Textarea',
  toggleswitch: 'Toggle Switch',
  progressbar: 'Progress Bar',
  listbox: 'List Box',
  datepickerinput: 'Date Picker Input',
  browser: 'Browser',
  timepickerinput: 'Time Picker Input',
  mobilePhone: 'Mobile Phone',
  tablet: 'Tablet',
  label: 'Label',
  radiobutton: 'Radio Button',
  rectangle: 'Rectangle',
  videoPlayer: 'Video Player',
  diamond: 'Diamond',
  line: 'Line',
  accordion: 'Accordion',
  pie: 'Pie',
  breadcrumb: 'Breadcrumb',
  map: 'Map',
  circle: 'Circle',
  star: 'Star',
  postit: 'Post-it',
  triangle: 'Triangle',
  'horizontal-menu': 'Horizontal Menu',
  largeArrow: 'Large Arrow',
  triangle: 'Triangle',
};

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

export interface OtherProps {
  stroke?: string;
  backgroundColor?: string;
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
  otherProps?: OtherProps;
}
