// Workaround for macOS-only bug in VS Code webview: HTML5 drag events targeting
// the inner iframe are dispatched to the iframe element in the shell, not to
// the iframe's contents (see microsoft/vscode#193558). We capture them here and
// forward the drop coordinates back to the iframe via postMessage.

const DRAG_START = 'qm:drag-start';
const DRAG_END = 'qm:drag-end';
const GALLERY_DROP = 'qm:gallery-drop';

export const isDragBridgeMessage = (data: unknown): boolean => {
  const t = (data as { type?: string } | undefined)?.type;
  return t === DRAG_START || t === DRAG_END;
};

export const setupDragBridge = (
  iframe: HTMLIFrameElement,
  appOrigin: string
): void => {
  let activeShapeType: string | null = null;

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin !== appOrigin) return;
    const data = event.data as
      | { type?: string; shapeType?: string }
      | undefined;
    if (data?.type === DRAG_START && typeof data.shapeType === 'string') {
      activeShapeType = data.shapeType;
    } else if (data?.type === DRAG_END) {
      activeShapeType = null;
    }
  });

  document.addEventListener(
    'dragover',
    ev => {
      if (activeShapeType !== null) ev.preventDefault();
    },
    true
  );

  document.addEventListener(
    'drop',
    ev => {
      if (activeShapeType === null) return;
      ev.preventDefault();
      const rect = iframe.getBoundingClientRect();
      iframe.contentWindow?.postMessage(
        {
          type: GALLERY_DROP,
          shapeType: activeShapeType,
          clientX: ev.clientX - rect.left,
          clientY: ev.clientY - rect.top,
        },
        appOrigin
      );
      activeShapeType = null;
    },
    true
  );
};
