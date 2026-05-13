import { isMacOS } from '#common/helpers/platform.helpers.ts';
import { isVSCodeEnv } from '#common/utils/env.utils';
import { parentOrigin } from '#common/utils/vscode-bridge.utils';
import { ShapeType } from '#core/model';
import {
  type DragBridgeAppMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';

// In the VS Code webview the app runs inside a nested iframe. The native HTML5
// drag preview taken from inside that iframe is unreliable on macOS (the OS
// captures the drag image at the shell level and the snapshot is missing or
// inconsistent — see microsoft/vscode#193558). To get a consistent preview on
// every platform we suppress the iframe-side native preview and let the shell
// paint its own preview from a thumbnail data URL the iframe sends on
// drag-start; the shell keeps the preview under the cursor using `dragover`
// events forwarded from the iframe (on macOS the iframe never receives them so
// the shell falls back to its own native `dragover`).
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
