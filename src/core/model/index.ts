export interface ShapeSizeRestrictions {
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  defaultWidth: number;
  defaultHeight: number;
}

export type ShapeType =
  | 'multiple' // TODO: check whether we could remove this and just and shapeType as optional where we use it
  | 'combobox'
  | 'input'
  | 'button'
  | 'checkbox'
  | 'textarea'
  | 'toggleswitch'
  | 'toggleLightDark'
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
  | 'audioPlayer'
  | 'diamond'
  | 'icon'
  | 'horizontalLine'
  | 'verticalLine'
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
  | 'modalCover'
  | 'tabsBar'
  | 'appBar'
  | 'appBar'
  | 'buttonBar'
  | 'tooltip'
  | 'inputWithStepper'
  | 'slider'
  | 'chip'
  | 'link'
  | 'cilinder'
  | 'richtext'
  | 'loading-indicator'
  | 'videoconference'
  | 'richtext'
  | 'gauge'
  | 'imagePlaceholder';

export const ShapeDisplayName: Record<ShapeType, string> = {
  multiple: 'multiple',
  combobox: 'Combobox',
  input: 'Input',
  button: 'Button',
  checkbox: 'Checkbox',
  textarea: 'Textarea',
  toggleswitch: 'Toggle Switch',
  toggleLightDark: 'Toggle Light/Dark',
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
  audioPlayer: 'Audio Player',
  diamond: 'Diamond',
  horizontalLine: 'Horizontal Line',
  verticalLine: 'Vertical Line',
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
  link: 'Link',
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
  modalCover: 'Modal Cover',
  tabsBar: 'Tabs Bar',
  appBar: 'AppBar',
  buttonBar: 'Button Bar',
  tooltip: 'Tooltip',
  slider: 'Slider',
  inputWithStepper: 'Input With Stepper',
  chip: 'Chip',
  richtext: 'Rich Text',
  cilinder: 'Cilinder',
  'loading-indicator': 'Loading',
  videoconference: 'Videoconference',
  gauge: 'Gauge',
  imagePlaceholder: 'Image Placeholder',
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
  fontVariant?: string;
  fontStyle?: string;
  fontSize?: number;
  textDecoration?: string;
  checked?: boolean;
  icon?: IconInfo;
  iconSize?: IconSize;
  imageSrc?: string;
  imageBlackAndWhite?: boolean;
  progress?: string;
  borderRadius?: string;
  activeElement?: number;
  selectedBackgroundColor?: string;
  textAlignment?: 'left' | 'center' | 'right';
  disabled?: boolean;
  isPlaceholder?: boolean;
  isPassword?: boolean;
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
