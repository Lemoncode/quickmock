import { ShapeModel } from '../model';
import { DocumentModel } from '../providers/canvas/canvas.model';
import { QuickMockFileContract, Page } from './local-disk.model';

export const mapFromShapesArrayToQuickMockFileDocument = (
  shapes: ShapeModel[]
): QuickMockFileContract => {
  const pages: Page[] = shapes.reduce((acc, shape) => {
    /*
     * TODO: Add the correct id, name and version values.
     */
    const newPage: Page = {
      id: '1',
      name: 'default',
      shapes: [{ ...shape }],
    };

    return [...acc, newPage];
  }, [] as Page[]);

  return {
    version: '0.1',
    pages,
  };
};

export const mapFromQuickMockFileDocumentToApplicationDocument = (
  fileDocument: QuickMockFileContract
): DocumentModel => {
  const shapes: ShapeModel[] = fileDocument.pages.reduce((acc, page) => {
    return [...acc, ...page.shapes];
  }, [] as ShapeModel[]);
  return {
    shapes,
  };
};
