import {
  Coord,
  ShapeType,
  Size,
  ShapeModel,
  EditType,
  OtherProps,
  ShapeSizeRestrictions,
} from '@/core/model';
import { v4 as uuidv4 } from 'uuid';

import {
  getComboBoxShapeSizeRestrictions,
  getInputShapeSizeRestrictions,
  getListboxShapeSizeRestrictions,
  getTextAreaSizeRestrictions,
  getToggleSwitchShapeSizeRestrictions,
  getProgressBarShapeSizeRestrictions,
  getDatepickerInputShapeSizeRestrictions,
  getButtonShapeSizeRestrictions,
  getTimepickerInputShapeSizeRestrictions,
  getRadioButtonShapeSizeRestrictions,
  getCheckboxShapeSizeRestrictions,
  getIconShapeSizeRestrictions,
  getHorizontalScrollBarShapeSizeRestrictions,
  getVerticalScrollBarShapeSizeRestrictions,
  getLabelSizeRestrictions,
} from '@/common/components/front-components';
import {
  getBrowserWindowShapeSizeRestrictions,
  getMobilePhoneShapeSizeRestrictions,
  getModalDialogShapeSizeRestrictions,
  getTabletShapeSizeRestrictions,
} from '@/common/components/front-containers';
import {
  getTriangleShapeSizeRestrictions,
  getCircleShapeSizeRestrictions,
  getDiamondShapeSizeRestrictions,
  getPostItShapeSizeRestrictions,
  getRectangleShapeSizeRestrictions,
  getlineShapeRestrictions,
  getStarShapeSizeRestrictions,
  getLargeArrowShapeSizeRestrictions,
  getImageShapeSizeRestrictions,
} from '@/common/components/front-basic-sapes';
import {
  getAccordionShapeSizeRestrictions,
  getBreadcrumbShapeSizeRestrictions,
  getPieChartShapeSizeRestrictions,
  getBarChartShapeSizeRestrictions,
  getVideoPlayerShapeSizeRestrictions,
  getHorizontalMenuShapeSizeRestrictions,
  getMapChartShapeSizeRestrictions,
  getLineChartShapeSizeRestrictions,
  getVerticalMenuShapeSizeRestrictions,
  getCalendarShapeSizeRestrictions,
  getTableSizeRestrictions,
  getModalShapeSizeRestrictions,
  getAppBarShapeSizeRestrictions,
  getButtonBarShapeSizeRestrictions,
} from '@/common/components/front-rich-components';
import {
  getHeading1SizeRestrictions,
  getHeading2SizeRestrictions,
  getHeading3SizeRestrictions,
  getNormaltextSizeRestrictions,
  getParagraphSizeRestrictions,
  getSmalltextSizeRestrictions,
} from '@/common/components/front-text-components';
import {
  BASIC_SHAPE,
  INPUT_SHAPE,
} from '@/common/components/front-components/shape.const';

export const getSizeRestrictionFromShape = (
  shapeType: ShapeType
): ShapeSizeRestrictions => {
  switch (shapeType) {
    case 'label':
      return getLabelSizeRestrictions();
    case 'combobox':
      return getComboBoxShapeSizeRestrictions();
    case 'input':
      return getInputShapeSizeRestrictions();
    case 'toggleswitch':
      return getToggleSwitchShapeSizeRestrictions();
    case 'textarea':
      return getTextAreaSizeRestrictions();
    case 'datepickerinput':
      return getDatepickerInputShapeSizeRestrictions();
    case 'button':
      return getButtonShapeSizeRestrictions();
    case 'progressbar':
      return getProgressBarShapeSizeRestrictions();
    case 'listbox':
      return getListboxShapeSizeRestrictions();
    case 'browser':
      return getBrowserWindowShapeSizeRestrictions();
    case 'mobilePhone':
      return getMobilePhoneShapeSizeRestrictions();
    case 'tablet':
      return getTabletShapeSizeRestrictions();
    case 'modalDialog':
      return getModalDialogShapeSizeRestrictions();
    case 'timepickerinput':
      return getTimepickerInputShapeSizeRestrictions();
    case 'rectangle':
      return getRectangleShapeSizeRestrictions();
    case 'videoPlayer':
      return getVideoPlayerShapeSizeRestrictions();
    case 'diamond':
      return getDiamondShapeSizeRestrictions();
    case 'line':
      return getlineShapeRestrictions();
    case 'accordion':
      return getAccordionShapeSizeRestrictions();
    case 'triangle':
      return getTriangleShapeSizeRestrictions();
    case 'postit':
      return getPostItShapeSizeRestrictions();
    case 'pie':
      return getPieChartShapeSizeRestrictions();
    case 'horizontal-menu':
      return getHorizontalMenuShapeSizeRestrictions();
    case 'vertical-menu':
      return getVerticalMenuShapeSizeRestrictions();
    case 'breadcrumb':
      return getBreadcrumbShapeSizeRestrictions();
    case 'map':
      return getMapChartShapeSizeRestrictions();
    case 'circle':
      return getCircleShapeSizeRestrictions();
    case 'star':
      return getStarShapeSizeRestrictions();
    case 'linechart':
      return getLineChartShapeSizeRestrictions();
    case 'heading1':
      return getHeading1SizeRestrictions();
    case 'heading2':
      return getHeading2SizeRestrictions();
    case 'heading3':
      return getHeading3SizeRestrictions();
    case 'normaltext':
      return getNormaltextSizeRestrictions();
    case 'smalltext':
      return getSmalltextSizeRestrictions();
    case 'paragraph':
      return getParagraphSizeRestrictions();
    case 'largeArrow':
      return getLargeArrowShapeSizeRestrictions();
    case 'radiobutton':
      return getRadioButtonShapeSizeRestrictions();
    case 'checkbox':
      return getCheckboxShapeSizeRestrictions();
    case 'icon':
      return getIconShapeSizeRestrictions();
    case 'bar':
      return getBarChartShapeSizeRestrictions();
    case 'image':
      return getImageShapeSizeRestrictions();
    case 'table':
      return getTableSizeRestrictions();
    case 'horizontalScrollBar':
      return getHorizontalScrollBarShapeSizeRestrictions();
    case 'calendar':
      return getCalendarShapeSizeRestrictions();
    case 'verticalScrollBar':
      return getVerticalScrollBarShapeSizeRestrictions();
    case 'modal':
      return getModalShapeSizeRestrictions();
    case 'appBar':
      return getAppBarShapeSizeRestrictions();
    case 'buttonBar':
      return getButtonBarShapeSizeRestrictions();
    default:
      console.warn(
        `** Shape ${shapeType} has not defined default size, check getDefaultSizeFromShape helper function`
      );
      return {
        minWidth: 200,
        minHeight: 50,
        maxWidth: -1,
        maxHeight: -1,
        defaultWidth: 200,
        defaultHeight: 50,
      };
  }
};

export const getMinSizeFromShape = (shapeType: ShapeType): Size => {
  const { minWidth: width, minHeight: height } =
    getSizeRestrictionFromShape(shapeType);

  return { width, height };
};

export const getDefaultSizeFromShape = (shapeType: ShapeType): Size => {
  const { defaultWidth: width, defaultHeight: height } =
    getSizeRestrictionFromShape(shapeType);

  return { width, height };
};

const doesShapeAllowInlineEdition = (shapeType: ShapeType): boolean => {
  switch (shapeType) {
    case 'input':
    case 'label':
    case 'combobox':
    case 'button':
    case 'textarea':
    case 'accordion':
    case 'checkbox':
    case 'radiobutton':
    case 'postit':
    case 'horizontal-menu':
    case 'vertical-menu':
    case 'breadcrumb':
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'normaltext':
    case 'smalltext':
    case 'paragraph':
    case 'listbox':
    case 'image':
    case 'table':
    case 'modal':
    case 'appBar':
    case 'buttonBar':
      return true;
    default:
      return false;
  }
};

const generateTypeOfTransformer = (shapeType: ShapeType): string[] => {
  switch (shapeType) {
    case 'label':
    case 'input':
    case 'button':
    case 'combobox':
    case 'line':
    case 'listbox':
    case 'checkbox':
    case 'toggleswitch':
    case 'progressbar':
    case 'datepickerinput':
    case 'timepickerinput':
    case 'radiobutton':
    case 'horizontal-menu':
    case 'breadcrumb':
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'normaltext':
    case 'smalltext':
    case 'horizontalScrollBar':
    case 'appBar':
    case 'buttonBar':
      return ['middle-left', 'middle-right'];
    case 'verticalScrollBar':
      return ['top-center', 'bottom-center'];
    case 'icon':
      return [];
    default:
      return [
        'top-left',
        'top-center',
        'top-right',
        'middle-left',
        'middle-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ];
  }
};

const generateDefaultTextValue = (shapeType: ShapeType): string | undefined => {
  switch (shapeType) {
    case 'input':
      return 'Placeholder';
    case 'label':
      return 'Label';
    case 'combobox':
      return 'Select an option';
    case 'button':
      return 'Click Me!';
    case 'radiobutton':
      return 'Select me!';
    case 'textarea':
      return 'Your text here...';
    case 'accordion':
      return '[*]Section A\nSection B';
    case 'breadcrumb':
      return 'Home, Category, Products';
    case 'checkbox':
      return 'Check me!';
    case 'postit':
      return '';
    case 'listbox':
      return '[*]Item\nItem1\nItem2\nItem3\nItem4\nItem5\nItem6';
    case 'horizontal-menu':
      return 'Home, About, Services, Contact';
    case 'vertical-menu':
      return 'Option 1\nOption 2\n----\nOption 3\nOption 4';
    case 'heading1':
      return 'Heading 1';
    case 'heading2':
      return 'Heading 2';
    case 'heading3':
      return 'Heading 3';
    case 'normaltext':
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    case 'smalltext':
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    case 'paragraph':
      return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna \naliqua.Ut enim ad minim veniam, quis nostrud exercitation \nullamco laboris nisi ut aliquip ex ea commodo consequat \nDuis aute irure dolor in reprehenderit in voluptate velit\nesse cillum dolore eu fugiat nulla pariatur. \nExcepteur sint occaecat cupidatat non proident, sunt in \nculpa qui officia deserunt mollit anim id est laborum.';
    case 'table':
      return 'Name ^, Age ^v, Country v\nJohn Doe, 30, USA\nJane Smith, 25, UK\nLuis Gomez, 35, Argentina\n{*L,20R,30C}';
    case 'modal':
      return 'Alert\nWarning: The action you are about to perform may affect existing data. Are you sure you want to proceed? Once confirmed, this action cannot be undone.\nConfirm,Cancel';
    case 'appBar':
      return 'AppBar';
    case 'buttonBar':
      return 'Button 1, Button 2, Button 3';
    default:
      return undefined;
  }
};

const getShapeEditInlineType = (shapeType: ShapeType): EditType | undefined => {
  const result = undefined;

  switch (shapeType) {
    case 'textarea':
    case 'accordion':
    case 'postit':
    case 'horizontal-menu':
    case 'breadcrumb':
    case 'paragraph':
    case 'listbox':
    case 'vertical-menu':
    case 'table':
    case 'modal':
    case 'appBar':
    case 'buttonBar':
      return 'textarea';
      break;
    case 'image':
      return 'imageupload';
      break;
  }
  return result;
};

export const generateDefaultOtherProps = (
  shapeType: ShapeType
): OtherProps | undefined => {
  switch (shapeType) {
    case 'input':
      return {
        stroke: INPUT_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: INPUT_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: INPUT_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
      };
    case 'button':
    case 'textarea':
    case 'combobox':
    case 'listbox':
    case 'vertical-menu':
    case 'horizontal-menu':
    case 'datepickerinput':
    case 'timepickerinput':
    case 'modal':
    case 'buttonBar':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
      };
    case 'largeArrow':
      return {
        stroke: '#000000',
        backgroundColor: '#d3d3d3',
        strokeStyle: [],
      };
    case 'postit':
      return {
        stroke: '#000000',
        backgroundColor: '#FFFF99',
        textColor: '#000000',
        strokeStyle: [],
      };
    case 'rectangle':
    case 'circle':
    case 'star':
    case 'diamond':
    case 'triangle':
      return {
        stroke: '#000000',
        backgroundColor: '#ffffff',
        strokeStyle: [],
      };
    case 'line':
      return {
        stroke: '#000000',
        strokeStyle: [],
      };
    case 'breadcrumb':
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'normaltext':
    case 'smalltext':
    case 'paragraph':
    case 'label':
      return {
        textColor: '#000000',
      };
    case 'toggleswitch':
      return {
        checked: true,
      };
    case 'checkbox':
    case 'radiobutton':
      return {
        checked: true,
        textColor: '#000000',
      };

    case 'appBar':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: '#A9A9A9',
        textColor: '#ffffff',
        strokeStyle: [],
      };
    case 'icon':
      return {
        icon: {
          name: 'open',
          filename: 'open.svg',
          searchTerms: ['open', 'folder', 'load'],
          categories: ['IT'],
        },
        iconSize: 'M',
      };
    case 'progressbar':
      return {
        progress: '50',
      };
    default:
      return undefined;
  }
};

// TODO: create interfaces to hold Coordination and Size
// coordinate: { x: number, y: number }
// size: { width: number, height: number }
export const createShape = (
  coord: Coord,
  shapeType: ShapeType,
  otherProps?: OtherProps
): ShapeModel => {
  const { x, y } = coord;
  const { width, height } = getDefaultSizeFromShape(shapeType);

  const defaultProps = generateDefaultOtherProps(shapeType);

  return {
    id: uuidv4(),
    x,
    y,
    width,
    height,
    type: shapeType,
    allowsInlineEdition: doesShapeAllowInlineEdition(shapeType),
    typeOfTransformer: generateTypeOfTransformer(shapeType),
    text: generateDefaultTextValue(shapeType),
    editType: getShapeEditInlineType(shapeType),
    otherProps: otherProps ? { ...defaultProps, ...otherProps } : defaultProps,
  };
};

// Snap model
export const SNAP_THRESHOLD = 5;

export type SnapLines = {
  vertical: number[];
  horizontal: number[];
};

export type SnapType = 'center' | 'start' | 'end';

export interface SnapEdge {
  guide: number;
  offset: number;
  snapType: SnapType;
}

export type SnapEdges = {
  vertical: SnapEdge[];
  horizontal: SnapEdge[];
};

export type SnapLineSubset = {
  snapLine: number;
  diff: number;
  snap: SnapType;
  offset: number;
};

export type ClosestSnapLines = {
  vertical: SnapLineSubset | null;
  horizontal: SnapLineSubset | null;
};
