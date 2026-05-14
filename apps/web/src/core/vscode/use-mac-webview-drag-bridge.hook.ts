import { ShapeType } from '#core/model';
import { useCanvasContext } from '#core/providers';
import {
  convertFromDivElementCoordsToKonvaCoords,
  getScrollFromDiv,
  portScreenPositionToDivCoordinates,
} from '#pods/canvas/canvas.util';
import { calculateShapeOffsetToXDropCoordinate } from '#pods/canvas/use-monitor.business';
import {
  type DragBridgeHostMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';
import { useEffect } from 'react';
import {
  notifyDragMoveToWebviewShell,
  shouldUseMacWebviewDragBridge,
} from './mac-webview-drag-bridge.utils';

// macOS workaround for microsoft/vscode#193558: drag events on the inner
// iframe route to the shell, so the shell-side bridge captures the drop and
// forwards coordinates here; this reproduces the insertion useMonitorShape
// performs natively on other platforms.

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

  useEffect(() => {
    if (!shouldUseMacWebviewDragBridge()) {
      return;
    }
    const handleDragOver = (event: DragEvent): void => {
      notifyDragMoveToWebviewShell(event.clientX, event.clientY);
    };
    document.addEventListener('dragover', handleDragOver, true);
    return () => {
      document.removeEventListener('dragover', handleDragOver, true);
    };
  }, []);
};
