import { useEffect } from 'react';
import { useCanvasContext } from '@/core/providers';
import { Coord } from '@/core/model';

export const useKeyboardDisplacement = () => {
  const { selectionInfo, updateShapePosition, isInlineEditing } =
    useCanvasContext();

  // TODO: move this to business/utils
  const updateShapeCollectionPosition = (
    shapeCollection: string[],
    delta: Coord
  ) => {
    // Here check
    shapeCollection.forEach((shapeId, index) => {
      const shapeData = selectionInfo.getSelectedShapeData(index);
      if (!shapeData) {
        return;
      }
      const newPosition: Coord = {
        x: shapeData.x + delta.x,
        y: shapeData.y + delta.y,
      };
      // update coords with the delta X,Y
      updateShapePosition(shapeId, newPosition);
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isInlineEditing) {
        return;
      }

      event.preventDefault();

      if (selectionInfo.selectedShapesIds.length === 0) {
        return;
      }

      const step = event.shiftKey ? 25 : 2; // If shift is pressed, move faster
      switch (event.key) {
        case 'ArrowUp':
          updateShapeCollectionPosition(selectionInfo.selectedShapesIds, {
            x: 0,
            y: -step,
          });
          break;
        case 'ArrowDown':
          updateShapeCollectionPosition(selectionInfo.selectedShapesIds, {
            x: 0,
            y: step,
          });
          break;
        case 'ArrowLeft':
          updateShapeCollectionPosition(selectionInfo.selectedShapesIds, {
            x: -step,
            y: 0,
          });
          break;
        case 'ArrowRight':
          updateShapeCollectionPosition(selectionInfo.selectedShapesIds, {
            x: step,
            y: 0,
          });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectionInfo.selectedShapesIds, selectionInfo.getSelectedShapeData]);
};
