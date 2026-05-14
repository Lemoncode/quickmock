import { isMacOS } from '#common/helpers/platform.helpers.ts';
import { isVSCodeEnv } from '#common/utils/env.utils';
import { parentOrigin } from '#common/utils/vscode-bridge.utils';
import { ShapeType } from '#core/model';
import {
  type DragBridgeAppMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';

// macOS workaround for microsoft/vscode#193558: the native HTML5 drag preview
// from the nested iframe is unreliable, so the shell paints its own preview
// from a thumbnail data URL the iframe sends on drag-start.
export const shouldUseMacWebviewDragBridge = (): boolean => {
  return isVSCodeEnv() && isMacOS();
};

const postMessageToWebviewShell = (message: DragBridgeAppMessage): void => {
  window.parent.postMessage(message, parentOrigin);
};

export const notifyDragStartToWebviewShell = (
  shapeType: ShapeType,
  thumbnailDataUrl: string
): void => {
  if (!shouldUseMacWebviewDragBridge()) {
    return;
  }
  postMessageToWebviewShell({
    type: DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START,
    payload: { shapeType, thumbnailDataUrl },
  });
};

export const notifyDragMoveToWebviewShell = (
  clientX: number,
  clientY: number
): void => {
  if (!shouldUseMacWebviewDragBridge()) {
    return;
  }
  postMessageToWebviewShell({
    type: DRAG_BRIDGE_MESSAGE_TYPE.DRAG_MOVE,
    payload: { clientX, clientY },
  });
};

export const notifyDragEndToWebviewShell = (): void => {
  if (!shouldUseMacWebviewDragBridge()) {
    return;
  }
  postMessageToWebviewShell({ type: DRAG_BRIDGE_MESSAGE_TYPE.DRAG_END });
};

const thumbnailDataUrlCache = new Map<string, Promise<string>>();

export const loadThumbnailAsDataUrl = (src: string): Promise<string> => {
  const cached = thumbnailDataUrlCache.get(src);
  if (cached) return cached;
  const promise = fetch(src)
    .then(response => response.blob())
    .then(
      blob =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(blob);
        })
    );
  thumbnailDataUrlCache.set(src, promise);
  return promise;
};
