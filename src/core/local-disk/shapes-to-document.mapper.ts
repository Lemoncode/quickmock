import { FONT_SIZE_VALUES } from '@/common/components/mock-components/front-components/shape.const';
import { ShapeModel } from '../model';
import { DocumentModel } from '../providers/canvas/canvas.model';
import { QuickMockFileContract } from './local-disk.model';

export const mapFromShapesArrayToQuickMockFileDocument = (
  fullDocument: DocumentModel
): QuickMockFileContract => {
  // TODO: Serialize the activePageIndex?
  return {
    version: '0.2',
    pages: fullDocument.pages,
  };
};

export const mapFromQuickMockFileDocumentToApplicationDocument = (
  fileDocument: QuickMockFileContract
): DocumentModel => {
  return {
    activePageIndex: 0,
    pages: fileDocument.pages,
  };
};

const mapTextElementFromV0_1ToV0_2 = (shape: ShapeModel): ShapeModel => {
  switch (shape.type) {
    case 'heading1':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.HEADING1,
        },
      };
    case 'heading2':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.HEADING2,
        },
      };
    case 'heading3':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.HEADING3,
        },
      };
    case 'link':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.LINK,
        },
      };
    case 'normaltext':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.NORMALTEXT,
        },
      };
    case 'smalltext':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.SMALLTEXT,
        },
      };
    case 'paragraph':
      return {
        ...shape,
        otherProps: {
          ...shape,
          fontSize: FONT_SIZE_VALUES.PARAGRAPH,
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
  };
};
