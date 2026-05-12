import { useEffect } from 'react';
import {
  convertFromDivElementCoordsToKonvaCoords,
  getScrollFromDiv,
  portScreenPositionToDivCoordinates,
} from './canvas.util';
import { ShapeType } from '#core/model';
import { useCanvasContext } from '#core/providers';
import { calculateShapeOffsetToXDropCoordinate } from './use-monitor.business';

// Receives gallery-drop messages forwarded by the webview shell on macOS
// (workaround for microsoft/vscode#193558: HTML5 drag events targeting the
// inner iframe are dispatched to the iframe element in the shell instead of
// to its contents, so PDND never sees them).
export const useMacWebviewDragBridge = (
  dropRef: React.MutableRefObject<null>,
  addNewShape: (type: ShapeType, x: number, y: number) => void
) => {
  const { stageRef } = useCanvasContext();

  useEffect(() => {
    const onMessage = (ev: MessageEvent) => {
      const data = ev.data as
        | {
            type?: string;
            shapeType?: ShapeType;
            clientX?: number;
            clientY?: number;
          }
        | undefined;
      if (
        data?.type !== 'qm:gallery-drop' ||
        !data.shapeType ||
        typeof data.clientX !== 'number' ||
        typeof data.clientY !== 'number'
      ) {
        return;
      }

      const dropDiv = dropRef.current as HTMLDivElement | null;
      const stage = stageRef.current;
      if (!dropDiv || !stage) return;

      const screenPosition = { x: data.clientX, y: data.clientY };
      const { x: divRelativeX, y: divRelativeY } =
        portScreenPositionToDivCoordinates(dropDiv, screenPosition);
      const { scrollLeft, scrollTop } = getScrollFromDiv(
        dropRef as unknown as React.MutableRefObject<HTMLDivElement>
      );
      const konvaCoord = convertFromDivElementCoordsToKonvaCoords(stage, {
        screenPosition,
        relativeDivPosition: { x: divRelativeX, y: divRelativeY },
        scroll: { x: scrollLeft, y: scrollTop },
      });

      const positionX =
        konvaCoord.x -
        calculateShapeOffsetToXDropCoordinate(konvaCoord.x, data.shapeType);
      const positionY = konvaCoord.y;

      addNewShape(data.shapeType, positionX, positionY);
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);
};
