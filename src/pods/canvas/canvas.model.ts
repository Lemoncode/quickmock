import {
  Coord,
  ShapeType,
  Size,
  ShapeModel,
  EditType,
  OtherProps,
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
} from '@/common/components/front-components';
import {
  getBrowserWindowShapeSizeRestrictions,
  getMobilePhoneShapeSizeRestrictions,
  getTabletShapeSizeRestrictions,
} from '@/common/components/front-containers';
import { getLabelSizeRestrictions } from '@/common/components/front-components/label-shape';
import {
  getTriangleShapeSizeRestrictions,
  getCircleShapeSizeRestrictions,
  getDiamondShapeSizeRestrictions,
  getPostItShapeSizeRestrictions,
  getRectangleShapeSizeRestrictions,
  getlineShapeRestrictions,
  getStarShapeSizeRestrictions,
  getLargeArrowShapeSizeRestrictions,
} from '@/common/components/front-basic-sapes';
import {
  getAccordionShapeSizeRestrictions,
  getBreadcrumbShapeSizeRestrictions,
  getPieChartShapeSizeRestrictions,
  getVideoPlayerShapeSizeRestrictions,
  getHorizontalMenuShapeSizeRestrictions,
  getMapChartShapeSizeRestrictions,
} from '@/common/components/front-rich-components';
import {
  getHeading1SizeRestrictions,
  getHeading2SizeRestrictions,
  getHeading3SizeRestrictions,
  getNormaltextSizeRestrictions,
  getParagraphSizeRestrictions,
  getSmalltextSizeRestrictions,
} from '@/common/components/front-text-components';

export const getDefaultSizeFromShape = (shapeType: ShapeType): Size => {
  switch (shapeType) {
    case 'label':
      return {
        width: getLabelSizeRestrictions().defaultWidth,
        height: getLabelSizeRestrictions().defaultHeight,
      };
    case 'combobox':
      return {
        width: getComboBoxShapeSizeRestrictions().defaultWidth,
        height: getComboBoxShapeSizeRestrictions().defaultHeight,
      };
    case 'input':
      return {
        width: getInputShapeSizeRestrictions().defaultWidth,
        height: getInputShapeSizeRestrictions().defaultHeight,
      };
    case 'toggleswitch':
      return {
        width: getToggleSwitchShapeSizeRestrictions().defaultWidth,
        height: getToggleSwitchShapeSizeRestrictions().defaultHeight,
      };
    case 'textarea':
      return {
        width: getTextAreaSizeRestrictions().defaultWidth,
        height: getTextAreaSizeRestrictions().defaultHeight,
      };
    case 'datepickerinput':
      return {
        width: getDatepickerInputShapeSizeRestrictions().defaultWidth,
        height: getDatepickerInputShapeSizeRestrictions().defaultHeight,
      };
    case 'button':
      return {
        width: getButtonShapeSizeRestrictions().defaultWidth,
        height: getButtonShapeSizeRestrictions().defaultHeight,
      };
    case 'progressbar': {
      return {
        width: getProgressBarShapeSizeRestrictions().defaultWidth,
        height: getProgressBarShapeSizeRestrictions().defaultHeight,
      };
    }
    case 'listbox':
      return {
        width: getListboxShapeSizeRestrictions().defaultWidth,
        height: getListboxShapeSizeRestrictions().defaultHeight,
      };
    case 'browser':
      return {
        width: getBrowserWindowShapeSizeRestrictions().defaultWidth,
        height: getBrowserWindowShapeSizeRestrictions().defaultHeight,
      };
    case 'mobilePhone':
      return {
        width: getMobilePhoneShapeSizeRestrictions().defaultWidth,
        height: getMobilePhoneShapeSizeRestrictions().defaultHeight,
      };
    case 'tablet':
      return {
        width: getTabletShapeSizeRestrictions().defaultWidth,
        height: getTabletShapeSizeRestrictions().defaultHeight,
      };
    case 'timepickerinput':
      return {
        width: getTimepickerInputShapeSizeRestrictions().defaultWidth,
        height: getTimepickerInputShapeSizeRestrictions().defaultHeight,
      };
    case 'rectangle':
      return {
        width: getRectangleShapeSizeRestrictions().defaultWidth,
        height: getRectangleShapeSizeRestrictions().defaultHeight,
      };
    case 'videoPlayer':
      return {
        width: getVideoPlayerShapeSizeRestrictions().defaultWidth,
        height: getVideoPlayerShapeSizeRestrictions().defaultHeight,
      };
    case 'diamond':
      return {
        width: getDiamondShapeSizeRestrictions().defaultWidth,
        height: getDiamondShapeSizeRestrictions().defaultHeight,
      };
    case 'line':
      return {
        width: getlineShapeRestrictions().defaultWidth,
        height: getlineShapeRestrictions().defaultHeight,
      };
    case 'accordion':
      return {
        width: getAccordionShapeSizeRestrictions().defaultWidth,
        height: getAccordionShapeSizeRestrictions().defaultHeight,
      };
    case 'triangle':
      return {
        width: getTriangleShapeSizeRestrictions().defaultWidth,
        height: getTriangleShapeSizeRestrictions().defaultHeight,
      };
    case 'postit':
      return {
        width: getPostItShapeSizeRestrictions().defaultWidth,
        height: getPostItShapeSizeRestrictions().defaultHeight,
      };
    case 'pie':
      return {
        width: getPieChartShapeSizeRestrictions().defaultWidth,
        height: getPieChartShapeSizeRestrictions().defaultHeight,
      };
    case 'horizontal-menu':
      return {
        width: getHorizontalMenuShapeSizeRestrictions().defaultWidth,
        height: getHorizontalMenuShapeSizeRestrictions().defaultHeight,
      };
    case 'breadcrumb':
      return {
        width: getBreadcrumbShapeSizeRestrictions().defaultWidth,
        height: getBreadcrumbShapeSizeRestrictions().defaultHeight,
      };
    case 'map':
      return {
        width: getMapChartShapeSizeRestrictions().defaultWidth,
        height: getMapChartShapeSizeRestrictions().defaultHeight,
      };
    case 'circle':
      return {
        width: getCircleShapeSizeRestrictions().defaultWidth,
        height: getCircleShapeSizeRestrictions().defaultHeight,
      };
    case 'star':
      return {
        width: getStarShapeSizeRestrictions().defaultWidth,
        height: getStarShapeSizeRestrictions().defaultHeight,
      };
    case 'heading1':
      return {
        width: getHeading1SizeRestrictions().defaultWidth,
        height: getHeading1SizeRestrictions().defaultHeight,
      };
    case 'heading2':
      return {
        width: getHeading2SizeRestrictions().defaultWidth,
        height: getHeading2SizeRestrictions().defaultHeight,
      };
    case 'heading3':
      return {
        width: getHeading3SizeRestrictions().defaultWidth,
        height: getHeading3SizeRestrictions().defaultHeight,
      };
    case 'normaltext':
      return {
        width: getNormaltextSizeRestrictions().defaultWidth,
        height: getNormaltextSizeRestrictions().defaultHeight,
      };
    case 'smalltext':
      return {
        width: getSmalltextSizeRestrictions().defaultWidth,
        height: getSmalltextSizeRestrictions().defaultHeight,
      };
    case 'paragraph':
      return {
        width: getParagraphSizeRestrictions().defaultWidth,
        height: getParagraphSizeRestrictions().defaultHeight,
      };
    case 'largeArrow':
      return {
        width: getLargeArrowShapeSizeRestrictions().defaultWidth,
        height: getLargeArrowShapeSizeRestrictions().defaultHeight,
      };
    case 'radiobutton':
      return {
        width: getRadioButtonShapeSizeRestrictions().defaultWidth,
        height: getRadioButtonShapeSizeRestrictions().defaultHeight,
      };
    case 'checkbox':
      return {
        width: getCheckboxShapeSizeRestrictions().defaultWidth,
        height: getCheckboxShapeSizeRestrictions().defaultHeight,
      };
    case 'icon':
      return {
        width: getIconShapeSizeRestrictions().defaultWidth,
        height: getIconShapeSizeRestrictions().defaultHeight,
      };
    default:
      console.warn(
        `** Shape ${shapeType} has not defined default size, check getDefaultSizeFromShape helper function`
      );
      return { width: 200, height: 50 };
  }
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
    case 'breadcrumb':
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'normaltext':
    case 'smalltext':
    case 'paragraph':
    case 'listbox':
      return true;
    default:
      return false;
  }
};

const generateTypeOfTransformer = (shapeType: ShapeType): string[] => {
  switch (shapeType) {
    case 'line':
      return ['middle-left', 'middle-right'];
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
      return '';
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
      return 'Home\nCategory\nProducts';
    case 'checkbox':
      return 'Check me!';
    case 'postit':
      return '';
    case 'listbox':
      return '[*]Item\nItem1\nItem2\nItem3\nItem4\nItem5\nItem6';
    case 'horizontal-menu':
      return 'Home\nAbout\nServices\nContact';
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
      return 'textarea';
      break;
  }
  return result;
};

export const generateDefaultOtherProps = (
  shapeType: ShapeType
): OtherProps | undefined => {
  switch (shapeType) {
    case 'input':
    case 'button':
    case 'heading1':
    case 'heading2':
    case 'heading3':
    case 'normaltext':
    case 'smalltext':
    case 'paragraph':
    case 'textarea':
    case 'combobox':
    case 'listbox':
    case 'datepickerinput':
    case 'timepickerinput':
    case 'rectangle':
    case 'circle':
    case 'star':
    case 'diamond':
    case 'triangle':
    case 'line':
    case 'postit':
      return {
        stroke: '#000000',
        backgroundColor: '#ffffff',
        textColor: '#000000',
      };
    case 'largeArrow':
      return {
        stroke: '#000000',
        backgroundColor: '#d3d3d3',
        textColor: '#000000',
      };
    case 'toggleswitch':
    case 'radiobutton':
    case 'checkbox':
      return {
        checked: true,
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
    default:
      return undefined;
  }
};

// TODO: create interfaces to hold Coordination and Size
// coordinate: { x: number, y: number }
// size: { width: number, height: number }
export const createShape = (coord: Coord, shapeType: ShapeType): ShapeModel => {
  const { x, y } = coord;
  const { width, height } = getDefaultSizeFromShape(shapeType);

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
    otherProps: generateDefaultOtherProps(shapeType),
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
