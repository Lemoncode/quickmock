import {
  type DragBridgeAppMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';

// Workaround for macOS-only VS Code webview bug: HTML5 drag events targeting
// the inner iframe are dispatched to the iframe element in the shell instead
// of to the iframe's contents, so the drag-and-drop library inside the iframe
// never sees `dragover`/`drop` (see microsoft/vscode#193558).
//
// On macOS only, this bridge captures those events here in the shell and
// forwards the drop coordinates back to the iframe via postMessage. On
// Linux/Windows the native HTML5 path works inside the iframe, so this bridge
// is a no-op there to keep behaviour unchanged.

type DragStartMessage = Extract<
  DragBridgeAppMessage,
  { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START }
>;

type DragEndMessage = Extract<
  DragBridgeAppMessage,
  { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_END }
>;

const isRunningOnMacOS = (): boolean => {
  return navigator.userAgent.toLowerCase().includes('mac');
};

const isDragStartMessage = (data: unknown): data is DragStartMessage => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const message = data as { type?: unknown; payload?: { shapeType?: unknown } };
  return (
    message.type === DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START &&
    typeof message.payload?.shapeType === 'string'
  );
};

const isDragEndMessage = (data: unknown): data is DragEndMessage => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  return (
    (data as { type?: unknown }).type === DRAG_BRIDGE_MESSAGE_TYPE.DRAG_END
  );
};

export const isDragBridgeMessage = (data: unknown): boolean => {
  return isDragStartMessage(data) || isDragEndMessage(data);
};

export const setupDragBridge = (
  iframe: HTMLIFrameElement,
  appOrigin: string
): void => {
  if (!isRunningOnMacOS()) {
    return;
  }

  let activeShapeType: string | null = null;

  const handleIncomingMessage = (event: MessageEvent): void => {
    if (event.origin !== appOrigin) {
      return;
    }
    if (isDragStartMessage(event.data)) {
      activeShapeType = event.data.payload.shapeType;
      return;
    }
    if (isDragEndMessage(event.data)) {
      activeShapeType = null;
    }
  };

  const handleDragOver = (event: DragEvent): void => {
    if (activeShapeType === null) {
      return;
    }
    // The browser only fires `drop` on a target whose `dragover` called
    // preventDefault, so this is required to receive the drop event below.
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent): void => {
    if (activeShapeType === null) {
      return;
    }
    event.preventDefault();
    const iframeBoundingRect = iframe.getBoundingClientRect();
    iframe.contentWindow?.postMessage(
      {
        type: DRAG_BRIDGE_MESSAGE_TYPE.GALLERY_DROP,
        payload: {
          shapeType: activeShapeType,
          clientX: event.clientX - iframeBoundingRect.left,
          clientY: event.clientY - iframeBoundingRect.top,
        },
      },
      appOrigin
    );
    activeShapeType = null;
  };

  window.addEventListener('message', handleIncomingMessage);
  document.addEventListener('dragover', handleDragOver, true);
  document.addEventListener('drop', handleDrop, true);
};
