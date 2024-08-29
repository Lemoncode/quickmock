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
  | 'modalDialog'
  | 'timepickerinput'
  | 'label'
  | 'radiobutton'
  | 'rectangle'
  | 'postit'
  | 'videoPlayer'
  | 'diamond'
  | 'icon'
  | 'line'
  | 'accordion'
  | 'pie'
  | 'horizontal-menu'
  | 'breadcrumb'
  | 'map'
  | 'circle'
  | 'star'
  | 'linechart'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'normaltext'
  | 'smalltext'
  | 'paragraph'
  | 'largeArrow'
  | 'bar'
  | 'triangle'
  | 'image'
  | 'vertical-menu'
  | 'horizontalScrollBar'
  | 'image'
  | 'calendar'
  | 'image'
  | 'table'
  | 'verticalScrollBar'
  | 'horizontalScrollBar'
  | 'modal'
  | 'appBar'
  | 'buttonBar';

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
  modalDialog: 'Modal Dialog',
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
  linechart: 'Line',
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',
  normaltext: 'Normal text',
  smalltext: 'Small text',
  paragraph: 'Paragraph',
  triangle: 'Triangle',
  'horizontal-menu': 'Horizontal Menu',
  largeArrow: 'Large Arrow',
  icon: 'Icon',
  bar: 'Bar Chart',
  image: 'Image',
  'vertical-menu': 'Vertical Menu',
  table: 'Table',
  horizontalScrollBar: 'Horizontal Scroll Bar',
  calendar: 'Calendar',
  verticalScrollBar: 'Vertical Scroll Bar',
  modal: 'Modal',
  appBar: 'AppBar',
  buttonBar: 'Button Bar',
};

export type EditType = 'input' | 'textarea' | 'imageupload';

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

export type Category = 'IT' | 'business' | 'Ecommerce' | 'Emojis';

export interface IconInfo {
  name: string;
  filename: string;
  searchTerms: string[];
  categories: Category[];
}

export type IconSize = 'XS' | 'S' | 'M' | 'L' | 'XL';

export interface OtherProps {
  stroke?: string;
  strokeStyle?: number[];
  backgroundColor?: string;
  textColor?: string;
  checked?: boolean;
  icon?: IconInfo;
  iconSize?: IconSize;
  imageSrc?: string;
  progress?: string;
}

export const BASE_ICONS_URL = '/icons/';

export interface ShapeModel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: ShapeType;
  allowsInlineEdition: boolean;
  typeOfTransformer: string[];
  editType?: EditType;
  text?: string;
  otherProps?: OtherProps;
}
