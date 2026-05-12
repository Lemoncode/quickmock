import { isMacOS } from '#common/helpers/platform.helpers';
import { isVSCodeEnv } from '#common/utils/env.utils';
import { parentOrigin } from '#common/utils/vscode-bridge.utils';
import { ShapeType } from '#core/model';
import {
  type DragBridgeAppMessage,
  DRAG_BRIDGE_MESSAGE_TYPE,
} from '@lemoncode/quickmock-bridge-protocol';

export const shouldUseMacWebviewDragBridge = (): boolean => {
  return isVSCodeEnv() && isMacOS();
};

const postMessageToWebviewShell = (message: DragBridgeAppMessage): void => {
  window.parent.postMessage(message, parentOrigin);
};

export const notifyDragStartToWebviewShell = (shapeType: ShapeType): void => {
  if (!shouldUseMacWebviewDragBridge()) {
    return;
  }
  postMessageToWebviewShell({
    type: DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START,
    payload: { shapeType },
  });
};

export const notifyDragEndToWebviewShell = (): void => {
  if (!shouldUseMacWebviewDragBridge()) {
    return;
  }
  postMessageToWebviewShell({ type: DRAG_BRIDGE_MESSAGE_TYPE.DRAG_END });
};
