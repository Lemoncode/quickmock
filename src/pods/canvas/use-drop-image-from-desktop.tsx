import { useCanvasContext } from '@/core/providers';
import invariant from 'tiny-invariant';
import {
  calculateScaledCoordsFromCanvasDivCoordinates,
  getScrollFromDiv,
} from './canvas.util';
import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';

export const useDropImageFromDesktop = (
  dropRef: React.MutableRefObject<HTMLDivElement>
) => {
  const { addNewShape, stageRef } = useCanvasContext();

  // TODO: #231  move this to utils / business
  // https://github.com/Lemoncode/quickmock/issues/231
  const isDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
    return (
      e.dataTransfer.items.length > 0 &&
      e.dataTransfer.items[0].kind === 'file' &&
      e.dataTransfer.items[0].type.startsWith('image/')
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropImageFile(e)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    if (isDropImageFile(e)) {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      const { clientX, clientY } = e;
      const divCoords = {
        x: clientX - e.currentTarget.offsetLeft,
        y: clientY - e.currentTarget.offsetTop,
      };

      reader.onload = e => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          invariant(stageRef.current);
          const stage = stageRef.current;
          const { scrollLeft, scrollTop } = getScrollFromDiv(dropRef);
          let konvaCoord = calculateScaledCoordsFromCanvasDivCoordinates(
            stage,
            divCoords,
            { x: scrollLeft, y: scrollTop }
          );

          const positionX =
            konvaCoord.x -
            calculateShapeOffsetToXDropCoordinate(konvaCoord.x, 'image');
          const positionY = konvaCoord.y;

          addNewShape('image', positionX, positionY, { imageSrc: img.src });
        };
      };

      reader.readAsDataURL(file);
    }
  };

  return { handleDragOver, handleDropImage };
};
