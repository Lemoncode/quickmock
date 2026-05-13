import {
  type DragBridgeAppMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';

// Workaround for a VS Code webview limitation around drag-and-drop across the
// shell ↔ inner iframe boundary:
//
// 1) On macOS, HTML5 drag events targeting the inner iframe are dispatched to
//    the iframe element in the shell instead of to the iframe's contents, so
//    the drag-and-drop library inside the iframe never sees `dragover`/`drop`
//    (microsoft/vscode#193558). This bridge captures those events in the shell
//    and forwards the drop coordinates back to the iframe.
//
// 2) The native drag image snapshot taken from inside a nested iframe is
//    unreliable on macOS (the OS captures it at the shell level). To get a
//    consistent preview on every platform, the iframe sends the gallery
//    thumbnail as a data URL on drag-start and the shell paints a floating
//    preview that tracks the cursor. The shell positions the preview from its
//    own `dragover` (active path on macOS) or from `drag-move` messages
//    forwarded by the iframe (active path on Linux/Windows where drag events
//    stay inside the iframe).

const PREVIEW_SIZE_PX = 110;
const PREVIEW_HALF_SIZE_PX = PREVIEW_SIZE_PX / 2;

type DragStartMessage = Extract<
  DragBridgeAppMessage,
  { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START }
>;

type DragMoveMessage = Extract<
  DragBridgeAppMessage,
  { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_MOVE }
>;

type DragEndMessage = Extract<
  DragBridgeAppMessage,
  { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_END }
>;

interface NavigatorWithUserAgentData extends Navigator {
  userAgentData?: { platform: string };
}

const isRunningOnMacOS = (): boolean => {
  const userAgentData = (navigator as NavigatorWithUserAgentData).userAgentData;
  if (userAgentData?.platform) {
    return userAgentData.platform === 'macOS';
  }
  return /Mac/i.test(navigator.userAgent);
};

const isDragStartMessage = (data: unknown): data is DragStartMessage => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const message = data as {
    type?: unknown;
    payload?: { shapeType?: unknown; thumbnailDataUrl?: unknown };
  };
  return (
    message.type === DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START &&
    typeof message.payload?.shapeType === 'string' &&
    typeof message.payload?.thumbnailDataUrl === 'string'
  );
};

const isDragMoveMessage = (data: unknown): data is DragMoveMessage => {
  if (!data || typeof data !== 'object') {
    return false;
  }
  const message = data as {
    type?: unknown;
    payload?: { clientX?: unknown; clientY?: unknown };
  };
  return (
    message.type === DRAG_BRIDGE_MESSAGE_TYPE.DRAG_MOVE &&
    typeof message.payload?.clientX === 'number' &&
    typeof message.payload?.clientY === 'number'
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
  return (
    isDragStartMessage(data) ||
    isDragMoveMessage(data) ||
    isDragEndMessage(data)
  );
};

const createPreviewElement = (thumbnailDataUrl: string): HTMLImageElement => {
  const preview = document.createElement('img');
  preview.src = thumbnailDataUrl;
  preview.draggable = false;
  preview.style.position = 'fixed';
  preview.style.top = '0';
  preview.style.left = '0';
  preview.style.width = `${PREVIEW_SIZE_PX}px`;
  preview.style.height = `${PREVIEW_SIZE_PX}px`;
  preview.style.objectFit = 'contain';
  preview.style.pointerEvents = 'none';
  preview.style.userSelect = 'none';
  preview.style.zIndex = '2147483647';
  preview.style.transform = 'translate3d(-9999px, -9999px, 0)';
  return preview;
};

export const setupDragBridge = (
  iframe: HTMLIFrameElement,
  appOrigin: string
): void => {
  let activeShapeType: string | null = null;
  let previewElement: HTMLImageElement | null = null;

  const removePreview = (): void => {
    if (previewElement) {
      previewElement.remove();
      previewElement = null;
    }
  };

  const positionPreviewAtShellCoords = (
    shellClientX: number,
    shellClientY: number
  ): void => {
    if (!previewElement) return;
    const x = shellClientX - PREVIEW_HALF_SIZE_PX;
    const y = shellClientY - PREVIEW_HALF_SIZE_PX;
    previewElement.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleIncomingMessage = (event: MessageEvent): void => {
    if (event.origin !== appOrigin) {
      return;
    }
    if (isDragStartMessage(event.data)) {
      activeShapeType = event.data.payload.shapeType;
      removePreview();
      previewElement = createPreviewElement(
        event.data.payload.thumbnailDataUrl
      );
      document.body.appendChild(previewElement);
      return;
    }
    if (isDragMoveMessage(event.data)) {
      // Iframe-relative coords; translate to shell viewport coords.
      const iframeRect = iframe.getBoundingClientRect();
      positionPreviewAtShellCoords(
        event.data.payload.clientX + iframeRect.left,
        event.data.payload.clientY + iframeRect.top
      );
      return;
    }
    if (isDragEndMessage(event.data)) {
      activeShapeType = null;
      removePreview();
    }
  };

  const handleDragOver = (event: DragEvent): void => {
    if (activeShapeType === null) {
      return;
    }
    // The browser only fires `drop` on a target whose `dragover` called
    // preventDefault, so this is required to receive the drop event below
    // (the macOS-only routing puts the event on the shell document).
    event.preventDefault();
    positionPreviewAtShellCoords(event.clientX, event.clientY);
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
    removePreview();
  };

  const handleDragEndOrCancel = (): void => {
    if (activeShapeType === null && previewElement === null) {
      return;
    }
    activeShapeType = null;
    removePreview();
  };

  window.addEventListener('message', handleIncomingMessage);
  // The native dragover/drop bridge is only needed on macOS, where the OS-bug
  // routes drag events from the inner iframe to the shell document. On
  // Linux/Windows the iframe handles its own drop natively and the shell only
  // renders the preview from the iframe-forwarded `DRAG_MOVE` messages.
  if (isRunningOnMacOS()) {
    document.addEventListener('dragover', handleDragOver, true);
    document.addEventListener('drop', handleDrop, true);
  }
  // Safety net: clean up the preview if the drag is cancelled outside the
  // shell (e.g. Esc key, window blur) and we never receive a drop or drag-end.
  document.addEventListener('dragend', handleDragEndOrCancel, true);
  window.addEventListener('blur', handleDragEndOrCancel);
};
