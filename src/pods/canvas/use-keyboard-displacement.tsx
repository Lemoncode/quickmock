import { useEffect } from 'react';
import { useCanvasContext } from '@/core/providers';

export const useKeyboardDisplacement = () => {
  const { selectionInfo, updateShapePosition } = useCanvasContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      const selectedShapeData = selectionInfo.getSelectedShapeData();
      if (selectedShapeData) {
        const step = event.shiftKey ? 25 : 2; // If shift is pressed, move faster
        switch (event.key) {
          case 'ArrowUp':
            updateShapePosition(selectionInfo.selectedShapeId, {
              x: selectedShapeData.x,
              y: selectedShapeData.y - step,
            });
            break;
          case 'ArrowDown':
            updateShapePosition(selectionInfo.selectedShapeId, {
              x: selectedShapeData.x,
              y: selectedShapeData.y + step,
            });
            break;
          case 'ArrowLeft':
            updateShapePosition(selectionInfo.selectedShapeId, {
              x: selectedShapeData.x - step,
              y: selectedShapeData.y,
            });
            break;
          case 'ArrowRight':
            updateShapePosition(selectionInfo.selectedShapeId, {
              x: selectedShapeData.x + step,
              y: selectedShapeData.y,
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
  }, [selectionInfo.selectedShapeId, selectionInfo.getSelectedShapeData]);
};
