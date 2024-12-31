import {
  INPUT_SHAPE,
  BASIC_SHAPE,
  FONT_SIZE_VALUES,
  LINK_SHAPE,
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
        disabled: INPUT_SHAPE.DEFAULT_DISABLED,
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
        disabled: BASIC_SHAPE.DEFAULT_DISABLED,
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
        disabled: BASIC_SHAPE.DEFAULT_DISABLED,
      };
    case 'combobox':
      return {
        stroke: BASIC_SHAPE.DEFAULT_STROKE_COLOR,
        backgroundColor: BASIC_SHAPE.DEFAULT_FILL_BACKGROUND,
        textColor: BASIC_SHAPE.DEFAULT_FILL_TEXT,
        strokeStyle: [],
        borderRadius: `${INPUT_SHAPE.DEFAULT_CORNER_RADIUS}`,
        disabled: BASIC_SHAPE.DEFAULT_DISABLED,
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
        disabled: false,
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
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };

    case 'heading2':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.HEADING2,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };
    case 'heading3':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.HEADING3,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };
    case 'link':
      return {
        textColor: `${LINK_SHAPE.DEFAULT_FILL_TEXT}`,
        textDecoration: 'underline',
        fontSize: FONT_SIZE_VALUES.LINK,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };
    case 'normaltext':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.NORMALTEXT,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };
    case 'smalltext':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontVariant: `${INPUT_SHAPE.DEFAULT_FONT_VARIANT}`,
        fontStyle: `${INPUT_SHAPE.DEFAULT_FONT_STYLE}`,
        textDecoration: `${INPUT_SHAPE.DEFAULT_TEXT_DECORATION}`,
        fontSize: FONT_SIZE_VALUES.SMALLTEXT,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };
    case 'paragraph':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontSize: FONT_SIZE_VALUES.PARAGRAPH,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
      };
    case 'richtext':
      return {
        textColor: `${BASIC_SHAPE.DEFAULT_STROKE_COLOR}`,
        fontSize: 16,
        textAlignment: `${BASIC_SHAPE.DEFAULT_TEXT_ALIGNMENT}`,
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
        disabled: BASIC_SHAPE.DEFAULT_DISABLED,
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
