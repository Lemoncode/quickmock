export const HOST_MESSAGE_TYPE = {
  LOAD: 'qm:load',
  SAVED: 'qm:saved',
  LOAD_FILE: 'LOAD_FILE',
} as const;

export const APP_MESSAGE_TYPE = {
  READY: 'qm:ready',
  SAVE: 'qm:save',
  RENDER_COMPLETE: 'qm:render-complete',
  WEBVIEW_READY: 'WEBVIEW_READY',
} as const;

export interface LoadFilePayload {
  data: unknown;
  fileName: string;
}

export type HostMessage =
  | {
      type: typeof HOST_MESSAGE_TYPE.LOAD;
      payload: { content: string; fileName: string };
    }
  | { type: typeof HOST_MESSAGE_TYPE.SAVED }
  | { type: typeof HOST_MESSAGE_TYPE.LOAD_FILE; payload: LoadFilePayload };

export type AppMessage =
  | { type: typeof APP_MESSAGE_TYPE.READY }
  | { type: typeof APP_MESSAGE_TYPE.SAVE; payload: { content: string } }
  | { type: typeof APP_MESSAGE_TYPE.RENDER_COMPLETE }
  | { type: typeof APP_MESSAGE_TYPE.WEBVIEW_READY };

export interface BridgeMessage<T = unknown> {
  type: string;
  payload?: T;
  requestId?: string;
}
