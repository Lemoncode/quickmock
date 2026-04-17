export interface ContentBbox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LoadFilePayload {
  data: unknown;
  fileName: string;
}

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

export type HostMessage =
  | {
      type: typeof HOST_MESSAGE_TYPE.LOAD;
      payload: { content: string; fileName: string };
    }
  | { type: typeof HOST_MESSAGE_TYPE.SAVED }
  | { type: typeof HOST_MESSAGE_TYPE.LOAD_FILE; payload: LoadFilePayload };

export type AppMessage =
  | { type: typeof APP_MESSAGE_TYPE.READY }
  | { type: typeof APP_MESSAGE_TYPE.WEBVIEW_READY }
  | { type: typeof APP_MESSAGE_TYPE.SAVE; payload: { content: string } }
  | {
      type: typeof APP_MESSAGE_TYPE.RENDER_COMPLETE;
      payload?: ContentBbox;
    };

export type PayloadOf<
  U extends { type: string },
  T extends U['type'],
> = Extract<U, { type: T }> extends { payload: infer P } ? P : undefined;
