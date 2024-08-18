import { useCanvasContext } from '@/core/providers';
import invariant from 'tiny-invariant';
import {
  calculateScaledCoordsFromCanvasDivCoordinates,
  convertFromDivElementCoordsToKonvaCoords,
  getKonvaCanvasScrollPosition,
} from './canvas.util';
import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';
import { Stage } from 'konva/lib/Stage';
import { RefObject } from 'react';

export const useDropImageFromDesktop = (
  dropRef: React.MutableRefObject<null>
) => {
  const { addNewShape, stageRef } = useCanvasContext();

  // TODO: this could be moved to business / util and add unit testing
  const isDropImageFile = (e: React.DragEvent<HTMLDivElement>) => {
    return (
      e.dataTransfer.items.length > 0 &&
      e.dataTransfer.items[0].kind === 'file' &&
      e.dataTransfer.items[0].type.startsWith('image/')
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Esto lo he sacado depurando, poner breakpoint
    if (isDropImageFile(e)) {
      e.preventDefault(); // Necesario para permitir el drop
      e.stopPropagation(); // Evita la propagación del evento
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

          let konvaCoord = calculateScaledCoordsFromCanvasDivCoordinates(
            stage,
            divCoords
          );

          //dropRef.current.scrollPosition.x;
          //dropRef.current.scrollPosition.y;
          //const scrollPosition = getKonvaCanvasScrollPosition(stageRef);
          const castedDropRef = dropRef as RefObject<HTMLDivElement>;
          const scrollLeft = castedDropRef?.current?.scrollLeft ?? 0;
          const scrollTop = castedDropRef?.current?.scrollTop ?? 0;
          konvaCoord = {
            x: konvaCoord.x + scrollLeft,
            y: konvaCoord.y + scrollTop,
          };

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

  return { handleDropImage, handleDragOver };
};
