import { useEffect } from 'react';
import {
  type DragBridgeHostMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';
import { ShapeType } from '#core/model';
import { useCanvasContext } from '#core/providers';
import {
  convertFromDivElementCoordsToKonvaCoords,
  getScrollFromDiv,
  portScreenPositionToDivCoordinates,
} from '#pods/canvas/canvas.util';
import { calculateShapeOffsetToXDropCoordinate } from '#pods/canvas/use-monitor.business';
import { shouldUseMacWebviewDragBridge } from './mac-webview-drag-bridge.utils';

// macOS-only workaround for microsoft/vscode#193558: HTML5 drag events
// targeting the inner iframe are dispatched to the iframe element in the
// shell, so pragmatic-drag-and-drop's drop target inside the iframe never
// fires. The shell-side bridge in vscode-extension/src/webview/drag-bridge.ts
// captures the drop and forwards the coordinates back to us via the
// DRAG_BRIDGE_MESSAGE_TYPE.GALLERY_DROP message, and we reproduce the same
// insertion that useMonitorShape would do natively on other platforms.

type GalleryDropMessage = Extract<
  DragBridgeHostMessage,
  { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.GALLERY_DROP }
>;

const isGalleryDropMessage = (data: unknown): data is GalleryDropMessage => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const message = data as {
    type?: unknown;
    payload?: {
      shapeType?: unknown;
      clientX?: unknown;
      clientY?: unknown;
    };
  };
  return (
    message.type === DRAG_BRIDGE_MESSAGE_TYPE.GALLERY_DROP &&
    typeof message.payload?.shapeType === 'string' &&
    typeof message.payload?.clientX === 'number' &&
    typeof message.payload?.clientY === 'number'
  );
};

export const useMacWebviewDragBridge = (
  dropRef: React.MutableRefObject<null>,
  addNewShape: (type: ShapeType, x: number, y: number) => void
) => {
  const { stageRef } = useCanvasContext();

  useEffect(() => {
    if (!shouldUseMacWebviewDragBridge()) {
      return;
    }

    const handleGalleryDrop = (event: MessageEvent): void => {
      if (!isGalleryDropMessage(event.data)) {
        return;
      }
      const { shapeType, clientX, clientY } = event.data.payload;

      const dropDivElement = dropRef.current as HTMLDivElement | null;
      const stageInstance = stageRef.current;
      if (!dropDivElement || !stageInstance) {
        return;
      }

      const screenPosition = { x: clientX, y: clientY };
      const relativeDivPosition = portScreenPositionToDivCoordinates(
        dropDivElement,
        screenPosition
      );
      const { scrollLeft, scrollTop } = getScrollFromDiv(
        dropRef as unknown as React.MutableRefObject<HTMLDivElement>
      );
      const konvaCoordinate = convertFromDivElementCoordsToKonvaCoords(
        stageInstance,
        {
          screenPosition,
          relativeDivPosition,
          scroll: { x: scrollLeft, y: scrollTop },
        }
      );

      const shapeOffsetX = calculateShapeOffsetToXDropCoordinate(
        konvaCoordinate.x,
        shapeType as ShapeType
      );
      const positionX = konvaCoordinate.x - shapeOffsetX;
      const positionY = konvaCoordinate.y;

      addNewShape(shapeType as ShapeType, positionX, positionY);
    };

    window.addEventListener('message', handleGalleryDrop);
    return () => {
      window.removeEventListener('message', handleGalleryDrop);
    };
  }, []);
};
