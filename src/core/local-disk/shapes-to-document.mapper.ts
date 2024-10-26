import { DocumentModel } from '../providers/canvas/canvas.model';
import { QuickMockFileContract } from './local-disk.model';

export const mapFromShapesArrayToQuickMockFileDocument = (
  fullDocument: DocumentModel
): QuickMockFileContract => {
  // TODO: Serialize the activePageIndex?
  return {
    version: '0.1',
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
