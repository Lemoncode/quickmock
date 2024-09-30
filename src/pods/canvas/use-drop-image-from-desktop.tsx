import { useCanvasContext } from '@/core/providers';
import invariant from 'tiny-invariant';
import {
  calculateScaledCoordsFromCanvasDivCoordinates,
  getScrollFromDiv,
} from './canvas.util';
import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';
import { getImageShapeSizeRestrictions } from '@/common/components/front-basic-sapes';
import { adjustSizeKeepingAspectRatio } from '@/common/utils/image.utils';
import { isDropImageFile } from './canvas.util';

export const useDropImageFromDesktop = (
  dropRef: React.MutableRefObject<HTMLDivElement>
) => {
  const { addNewShape, updateShapeSizeAndPosition, stageRef } =
    useCanvasContext();

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

          const newImg = addNewShape('image', positionX, positionY, {
            imageSrc: img.src,
          });

          // Preserves aspect ratio
          const defaultWidth = getImageShapeSizeRestrictions().defaultWidth;
          const defaultHeight = getImageShapeSizeRestrictions().defaultHeight;
          updateShapeSizeAndPosition(
            newImg,
            { x: positionX, y: positionY },
            adjustSizeKeepingAspectRatio(
              { width: img.width, height: img.height },
              { width: defaultWidth, height: defaultHeight }
            ),
            false
          );
        };
      };

      reader.readAsDataURL(file);
    }
  };

  return { handleDragOver, handleDropImage };
};
