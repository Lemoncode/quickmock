import { useEffect, useRef } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import {
  extractScreenCoordinatesFromPragmaticLocation,
  portScreenPositionToDivCoordinates,
  convertFromDivElementCoordsToKonvaCoords,
} from './canvas.util';
import Konva from 'konva';
import { ShapeType } from '@/core/model';

export const useMonitorShape = (
  dropRef: React.MutableRefObject<null>,
  addNewShape: (type: ShapeType, x: number, y: number) => void
) => {
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;
        invariant(destination);

        const type = source.data.type as ShapeType;
        const screenPosition =
          extractScreenCoordinatesFromPragmaticLocation(location);

        let positionX = 0;
        let positionY = 0;
        if (screenPosition) {
          invariant(dropRef.current);
          const { x: divRelativeX, y: divRelativeY } =
            portScreenPositionToDivCoordinates(
              dropRef.current as HTMLDivElement,
              screenPosition
            );

          invariant(stageRef.current);
          const stage = stageRef.current;
          const konvaCoord = convertFromDivElementCoordsToKonvaCoords(
            stage,
            screenPosition,
            {
              x: divRelativeX,
              y: divRelativeY,
            }
          );

          positionX = konvaCoord.x;
          positionY = konvaCoord.y;
        }
        addNewShape(type, positionX, positionY);
      },
    });
  }, []);

  return { stageRef };
};
