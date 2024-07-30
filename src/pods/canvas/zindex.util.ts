import { ShapeModel } from '@/core/model';

// TOO Add Unit tests to all these methods: #65
export const moveZIndexToTop = (
  selectedShapeId: string,
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  const selectedShape = shapeCollection.find(
    shape => shape.id === selectedShapeId
  );
  return selectedShape
    ? [
        ...shapeCollection.filter(shape => shape.id !== selectedShapeId),
        selectedShape,
      ]
    : shapeCollection;
};

export const moveZIndexToBottom = (
  selectedShapeId: string,
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  const selectedShape = shapeCollection.find(
    shape => shape.id === selectedShapeId
  );
  return selectedShape
    ? [
        selectedShape,
        ...shapeCollection.filter(shape => shape.id !== selectedShapeId),
      ]
    : shapeCollection;
};

export const moveZIndexDownOneLevel = (
  selectedShapeId: string,
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  const selectedShapeIndex = shapeCollection.findIndex(
    shape => shape.id === selectedShapeId
  );
  const selectedShape = shapeCollection.find(
    shape => shape.id === selectedShapeId
  );

  return selectedShape &&
    selectedShapeIndex > 0 &&
    selectedShapeIndex < shapeCollection.length
    ? [
        ...shapeCollection.slice(0, selectedShapeIndex - 1),
        selectedShape,
        shapeCollection[selectedShapeIndex - 1],
        ...shapeCollection.slice(selectedShapeIndex + 1),
      ]
    : shapeCollection;
};

export const moveZIndexTopOneLevel = (
  selectedShapeId: string,
  shapeCollection: ShapeModel[]
): ShapeModel[] => {
  const selectedShapeIndex = shapeCollection.findIndex(
    shape => shape.id === selectedShapeId
  );
  const selectedShape = shapeCollection.find(
    shape => shape.id === selectedShapeId
  );

  return selectedShape &&
    selectedShapeIndex >= 0 &&
    selectedShapeIndex < shapeCollection.length - 1
    ? [
        ...shapeCollection.slice(0, selectedShapeIndex),
        shapeCollection[selectedShapeIndex + 1],
        selectedShape,
        ...shapeCollection.slice(selectedShapeIndex + 2),
      ]
    : shapeCollection;
};
