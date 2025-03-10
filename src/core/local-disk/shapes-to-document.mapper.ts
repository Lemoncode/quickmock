import { FONT_SIZE_VALUES } from '@/common/components/mock-components/front-components/shape.const';
import { ShapeModel } from '../model';
import {
  createDefaultCanvasSize,
  DocumentModel,
} from '../providers/canvas/canvas.model';
import { Page, QuickMockFileContract } from './local-disk.model';
import { APP_CONSTANTS } from '../providers/canvas/canvas.model';

export const mapFromShapesArrayToQuickMockFileDocument = (
  fullDocument: DocumentModel
): QuickMockFileContract => {
  // TODO: Serialize the activePageIndex?
  return {
    version: '0.2',
    pages: fullDocument.pages,
    customColors: fullDocument.customColors,
    size: fullDocument.size,
  };
};

export const mapFromQuickMockFileDocumentToApplicationDocument = (
  fileDocument: QuickMockFileContract
): DocumentModel => {
  return {
    activePageIndex: 0,
    pages: AdaptMinor_0_2_Updates(fileDocument.pages),
    customColors:
      fileDocument.customColors ||
      new Array(APP_CONSTANTS.COLOR_SLOTS).fill(null),
    size: fileDocument.size ?? createDefaultCanvasSize(),
  };
};

const AdaptMinor_0_2_Updates = (pages: Page[]): Page[] => {
  return pages.map(page => {
    return {
      ...page,
      shapes: page.shapes.map(
        AddDefaultValuesForInputPropsPlaceHolderAndPassword
      ),
    };
  });
};

const AddDefaultValuesForInputPropsPlaceHolderAndPassword = (
  shape: ShapeModel
) => {
  switch (shape.type) {
    case 'input':
      return {
        ...shape,
        otherProps: {
          ...shape.otherProps,
          isPassword:
            shape.otherProps?.isPassword !== undefined
              ? shape.otherProps?.isPassword
              : false,
          isPlaceholder:
            // Small update no need to go for 0_3, but input placeHolder needs to have default value
            // if undefined
            shape.otherProps?.isPlaceholder !== undefined
              ? shape.otherProps?.isPlaceholder
              : true,
          textColor:
            // Small update, no need to go for 0_3,
            // but input textColor needs to have default value
            // if undefined, and textColor was placeholder gray color
            // in this case change it to black
            shape.otherProps?.isPlaceholder === undefined &&
            shape.otherProps?.textColor === '#8c8c8c'
              ? '#000000'
              : shape.otherProps?.textColor,
        },
      };
    default:
      return shape;
  }
};

const mapTextElementFromV0_1ToV0_2 = (shape: ShapeModel): ShapeModel => {
  switch (shape.type) {
    case 'heading1':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.HEADING1,
          textAlignment: 'center',
        },
      };
    case 'heading2':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.HEADING2,
          textAlignment: 'center',
        },
      };
    case 'heading3':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.HEADING3,
          textAlignment: 'center',
        },
      };
    case 'link':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.LINK,
          textAlignment: 'center',
        },
      };
    case 'normaltext':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.NORMALTEXT,
          textAlignment: 'center',
        },
      };
    case 'smalltext':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.SMALLTEXT,
          textAlignment: 'center',
        },
      };
    case 'paragraph':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.PARAGRAPH,
          textAlignment: 'center',
        },
      };
    default:
      return shape;
  }
};

const setTextElementsDefaultFontSizeV0_1 = (
  shapes: ShapeModel[]
): ShapeModel[] => {
  return shapes.map(mapTextElementFromV0_1ToV0_2);
};

// Example function to handle version 0.1 parsing
export const mapFromQuickMockFileDocumentToApplicationDocumentV0_1 = (
  fileDocument: QuickMockFileContract
): DocumentModel => {
  // Combine all shapes into a single page
  let combinedShapes: ShapeModel[] = fileDocument.pages.reduce<ShapeModel[]>(
    (acc: ShapeModel[], page) => {
      return acc.concat(page.shapes);
    },
    []
  );

  combinedShapes = setTextElementsDefaultFontSizeV0_1(combinedShapes);

  return {
    activePageIndex: 0,
    pages: [
      {
        id: '1',
        name: 'default',
        shapes: combinedShapes,
      },
    ],
    customColors:
      fileDocument.customColors ||
      new Array(APP_CONSTANTS.COLOR_SLOTS).fill(null),
    size: fileDocument.size,
  };
};
