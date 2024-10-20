import { ShapeModel } from '@/core/model';
import { DocumentModel } from './canvas.model';

export const removeShapesFromList = (
  shapeIds: string[],
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  if (shapeIds.length === 0) {
    return shapeCollection;
  }

  return shapeCollection.filter(shape => !shapeIds.includes(shape.id));
};

export const isPageIndexValid = (document: DocumentModel) => {
  return (
    document.activePageIndex !== -1 &&
    document.activePageIndex < document.pages.length
  );
};

export const getActivePageShapes = (document: DocumentModel) => {
  if (!isPageIndexValid(document)) {
    return [];
  }

  return document.pages[document.activePageIndex].shapes;
};
