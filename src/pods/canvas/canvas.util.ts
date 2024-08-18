import { Coord } from '@/core/model';
import { DragLocationHistory } from '@atlaskit/pragmatic-drag-and-drop/dist/types/internal-types';
import { Stage } from 'konva/lib/Stage';
import { RefObject } from 'react';

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

interface PositionInfo {
  screenPosition: Coord;
  relativeDivPosition: Coord;
  scroll: Coord;
}

export const convertFromDivElementCoordsToKonvaCoords = (
  stage: Stage,
  positionInfo: PositionInfo
): Coord => {
  const { screenPosition, relativeDivPosition, scroll } = positionInfo;

  stage.setPointersPositions([screenPosition.x, screenPosition.y]);
  const result: Coord = { x: 0, y: 0 };

  const pointerPosition = stage.getPointerPosition();
  if (pointerPosition) {
    const scaleX = stage.scaleX();
    const scaleY = stage.scaleY();

    result.x = (relativeDivPosition.x - stage.x() + scroll.x) / scaleX;
    result.y = (relativeDivPosition.y - stage.y() + scroll.y) / scaleY;
  }

  return result;
};

// TODO: Add unit testing to this function (mock stage object)
export const calculateScaledCoordsFromCanvasDivCoordinates = (
  stage: Stage,
  divCoords: Coord,
  scroll: Coord
): Coord => {
  const scaleX = stage.scaleX();
  const scaleY = stage.scaleY();

  return {
    x: (divCoords.x + scroll.x) / scaleX,
    y: (divCoords.y + scroll.y) / scaleY,
  };
};

export const getScrollFromDiv = (divRef: RefObject<HTMLDivElement>) => {
  const scrollLeft = divRef?.current?.scrollLeft ?? 0;
  const scrollTop = divRef?.current?.scrollTop ?? 0;

  return { scrollLeft, scrollTop };
};
