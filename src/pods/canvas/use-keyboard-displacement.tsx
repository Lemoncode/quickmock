import { useEffect } from 'react';
import { useCanvasContext } from '@/core/providers';
import { Coord } from '@/core/model';

export const useKeyboardDisplacement = (isEditing: boolean) => {
  const { selectionInfo, updateShapePosition } = useCanvasContext();

  // TODO: move this to business/utils
  const updateShapeCollectionPosition = (
    shapeCollection: string[],
    delta: Coord
  ) => {
    // Here check
    shapeCollection.forEach((shapeId, index) => {
      const shapeData = selectionInfo.getSelectedShapeData(index);
      if (!shapeData) return;

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
      if (isEditing) return;
      if (
        selectionInfo.selectedShapesIds.length > 0 &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        event.preventDefault();

        const step = event.shiftKey ? 20 : 2; // Si shift está presionado, moverse más rápido
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectionInfo.selectedShapesIds, selectionInfo.getSelectedShapeData]);
};
