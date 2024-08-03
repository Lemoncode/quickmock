import { Coord } from '@/core/model';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { Stage } from 'konva/lib/Stage';

// TODO Add unit tests to this functions
export const extractScreenCoordinatesFromPragmaticLocation = (
  location: DragLocationHistory
) => {
  const pragmaticDropInfo = location.current.input;
  return {
    x: pragmaticDropInfo.clientX,
    y: pragmaticDropInfo.clientY,
  };
};

export const portScreenPositionToDivCoordinates = (
  divElement: HTMLDivElement,
  screenPosition: Coord
): Coord => {
  const canvasRect = divElement.getBoundingClientRect();
  const x = screenPosition.x - canvasRect.left;
  const y = screenPosition.y - canvasRect.top;

  return { x, y };
};

export const convertFromDivElementCoordsToKonvaCoords = (
  stage: Stage,
  screenPosition: Coord,
  relativeDivPosition: Coord
): Coord => {
  stage.setPointersPositions([screenPosition.x, screenPosition.y]);
  const result: Coord = { x: 0, y: 0 };

  const pointerPosition = stage.getPointerPosition();
  if (pointerPosition) {
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    result.x = (relativeDivPosition.x - stage.x()) / scaleX;
    result.y = (relativeDivPosition.y - stage.y()) / scaleY;
  }

  return result;
};
