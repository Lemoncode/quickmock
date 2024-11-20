import { useEffect } from 'react';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import {
  extractScreenCoordinatesFromPragmaticLocation,
  portScreenPositionToDivCoordinates,
  convertFromDivElementCoordsToKonvaCoords,
  getScrollFromDiv,
} from './canvas.util';
import { ShapeType } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';

export const useMonitorShape = (
  dropRef: React.MutableRefObject<null>,
  addNewShape: (type: ShapeType, x: number, y: number) => void
) => {
  const { stageRef } = useCanvasContext();

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;
        invariant(destination);

        if (source.data.type !== 'thumbPage') {
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
            const { scrollLeft, scrollTop } = getScrollFromDiv(
              dropRef as unknown as React.MutableRefObject<HTMLDivElement>
            );
            const konvaCoord = convertFromDivElementCoordsToKonvaCoords(stage, {
              screenPosition,
              relativeDivPosition: { x: divRelativeX, y: divRelativeY },
              scroll: { x: scrollLeft, y: scrollTop },
            });

            positionX =
              konvaCoord.x -
              calculateShapeOffsetToXDropCoordinate(konvaCoord.x, type);
            positionY = konvaCoord.y;
          }
          addNewShape(type, positionX, positionY);
        }
      },
    });
  }, []);
};
