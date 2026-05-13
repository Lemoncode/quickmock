import type {
  APP_MESSAGE_TYPE,
  DRAG_BRIDGE_MESSAGE_TYPE,
  HOST_MESSAGE_TYPE,
} from './constant';

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

export interface ThemePayload {
  background: string;
  backgroundSecondary: string;
  foreground: string;
}

export type HostMessage =
  | {
      type: typeof HOST_MESSAGE_TYPE.LOAD;
      payload: { content: string; fileName: string };
    }
  | { type: typeof HOST_MESSAGE_TYPE.SAVED }
  | { type: typeof HOST_MESSAGE_TYPE.LOAD_FILE; payload: LoadFilePayload }
  | { type: typeof HOST_MESSAGE_TYPE.THEME; payload: ThemePayload };

export type AppMessage =
  | { type: typeof APP_MESSAGE_TYPE.READY }
  | { type: typeof APP_MESSAGE_TYPE.WEBVIEW_READY }
  | { type: typeof APP_MESSAGE_TYPE.SAVE; payload: { content: string } }
  | {
      type: typeof APP_MESSAGE_TYPE.RENDER_COMPLETE;
      payload?: ContentBbox;
    }
  | { type: typeof APP_MESSAGE_TYPE.NEW_FILE };

export type PayloadOf<U extends { type: string }, T extends U['type']> =
  Extract<U, { type: T }> extends { payload: infer P } ? P : undefined;

export interface DragStartPayload {
  shapeType: string;
  thumbnailDataUrl: string;
}

export interface DragMovePayload {
  clientX: number;
  clientY: number;
}

export interface GalleryDropPayload {
  shapeType: string;
  clientX: number;
  clientY: number;
}

export type DragBridgeAppMessage =
  | {
      type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_START;
      payload: DragStartPayload;
    }
  | {
      type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_MOVE;
      payload: DragMovePayload;
    }
  | { type: typeof DRAG_BRIDGE_MESSAGE_TYPE.DRAG_END };

export type DragBridgeHostMessage = {
  type: typeof DRAG_BRIDGE_MESSAGE_TYPE.GALLERY_DROP;
  payload: GalleryDropPayload;
};
