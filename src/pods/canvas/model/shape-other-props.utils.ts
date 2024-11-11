import {
  INPUT_SHAPE,
  BASIC_SHAPE,
  FONT_SIZE_VALUES,
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
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
        borderRadius: `${BASIC_SHAPE.DEFAULT_CORNER_RADIUS}`,
      };
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
    case 'horizontalLine':
      return {
        stroke: '#000000',
        strokeStyle: [],
      };
    case 'verticalLine':
      return {
        stroke: '#000000',
        strokeStyle: [],
      };
    case 'breadcrumb':
    case 'heading1':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.HEADING1,
      };

    case 'heading2':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.HEADING2,
      };
    case 'heading3':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.HEADING3,
      };
    case 'link':
      return {
        textColor: 'blue',
        textDecoration: 'underline',
        fontSize: FONT_SIZE_VALUES.LINK,
      };
    case 'normaltext':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.NORMALTEXT,
      };
    case 'smalltext':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.SMALLTEXT,
      };
    case 'paragraph':
      return {
        fontSize: FONT_SIZE_VALUES.PARAGRAPH,
      };
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
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
      };
    case 'image':
      return {
        imageSrc: '',
        imageBlackAndWhite: false,
      };
    case 'progressbar':
      return {
        progress: '50',
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
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
