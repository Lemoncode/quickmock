import { QUICKMOCK_APP_ORIGIN } from '#core/constants';
import {
  type AppMessage,
  HOST_MESSAGE_TYPE,
  type HostMessage,
} from '#core/protocol';

declare function acquireVsCodeApi(): { postMessage(msg: AppMessage): void };

const vscode = acquireVsCodeApi();

const QUICKMOCK_ORIGIN = QUICKMOCK_APP_ORIGIN;

const FORWARDED_TO_IFRAME: ReadonlySet<string> = new Set([
  HOST_MESSAGE_TYPE.LOAD,
  HOST_MESSAGE_TYPE.SAVED,
  HOST_MESSAGE_TYPE.LOAD_FILE,
]);

export const setupBridge = (iframe: HTMLIFrameElement): void => {
  window.addEventListener('message', (event: MessageEvent) => {
    if (event.origin === QUICKMOCK_ORIGIN) {
      vscode.postMessage(event.data as AppMessage);
    } else {
      const msg = event.data as HostMessage;
      if (FORWARDED_TO_IFRAME.has(msg.type)) {
        iframe.contentWindow?.postMessage(msg, QUICKMOCK_ORIGIN);
      }
    }
  });
};
