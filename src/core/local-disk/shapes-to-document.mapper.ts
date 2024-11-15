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

// Example function to handle version 0.1 parsing
export const mapFromQuickMockFileDocumentToApplicationDocumentV0_1 = (
  fileDocument: QuickMockFileContract
): DocumentModel => {
  // Combine all shapes into a single page
  const combinedShapes: ShapeModel[] = fileDocument.pages.reduce<ShapeModel[]>(
    (acc: ShapeModel[], page) => {
      return acc.concat(page.shapes);
    },
    []
  );

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
