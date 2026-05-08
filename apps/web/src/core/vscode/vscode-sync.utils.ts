import { QuickMockFileContract } from '#core/local-disk/local-disk.model';
import {
  mapFromQuickMockFileDocumentToApplicationDocument,
  mapFromQuickMockFileDocumentToApplicationDocumentV0_1,
  mapFromShapesArrayToQuickMockFileDocument,
} from '#core/local-disk/shapes-to-document.mapper';
import { DocumentModel } from '#core/providers/canvas/canvas.model';

export function deserializeDocument(data: QuickMockFileContract) {
  return data.version === '0.1'
    ? mapFromQuickMockFileDocumentToApplicationDocumentV0_1(data)
    : mapFromQuickMockFileDocumentToApplicationDocument(data);
}

export function serializeDocument(document: DocumentModel): string {
  return JSON.stringify(mapFromShapesArrayToQuickMockFileDocument(document));
}
