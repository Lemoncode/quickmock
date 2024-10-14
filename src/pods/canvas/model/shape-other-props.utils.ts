import {
  INPUT_SHAPE,
  BASIC_SHAPE,
} from '@/common/components/mock-components/front-components/shape.const';
import { ShapeType, OtherProps } from '@/core/model';

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
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
      };
    case 'tooltip':
      return {
        stroke: '#bbbbbb',
        backgroundColor: '#bbbbbb',
        textColor: '#ffffff',
        strokeStyle: [],
      };
    case 'button':
    case 'textarea':
    case 'vertical-menu':
    case 'horizontal-menu':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
        borderRadius: `${BASIC_SHAPE.DEFAULT_CORNER_RADIUS}`,
        activeElement: 0,
      };
    case 'datepickerinput':
    case 'timepickerinput':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
      };
    case 'combobox':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
      };
    case 'modal':
    case 'buttonBar':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
        activeElement: 0,
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
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
      };
    case 'listbox':
      return {
        stroke: '#000000',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        selectedBackgroundColor: '#add8e6',
      };

    case 'circle':
    case 'star':
    case 'diamond':
    case 'triangle':
      return {
        stroke: '#000000',
        backgroundColor: '#ffffff',
        strokeStyle: [],
      };
    case 'rectangle':
      return {
        stroke: '#000000',
        backgroundColor: '#ffffff',
        strokeStyle: [],
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
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
    case 'image':
      return {
        imageSrc: '',
        imageBlackAndWhite: false,
      };
    case 'progressbar':
      return {
        progress: '50',
      };
    case 'slider':
      return {
        progress: '50',
        backgroundColor: '#A9A9A9',
      };
    case 'tabsBar':
      return {
        activeElement: 0,
      };
    default:
      return undefined;
  }
};
