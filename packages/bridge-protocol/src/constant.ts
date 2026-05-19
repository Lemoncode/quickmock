export const HOST_MESSAGE_TYPE = {
  LOAD: 'qm:load',
  SAVED: 'qm:saved',
  LOAD_FILE: 'LOAD_FILE',
  THEME: 'qm:theme',
} as const;

export const APP_MESSAGE_TYPE = {
  READY: 'qm:ready',
  SAVE: 'qm:save',
  RENDER_COMPLETE: 'qm:render-complete',
  WEBVIEW_READY: 'WEBVIEW_READY',
  NEW_FILE: 'qm:new-file',
} as const;

export const DRAG_BRIDGE_MESSAGE_TYPE = {
  DRAG_START: 'qm:drag-start',
  DRAG_MOVE: 'qm:drag-move',
  DRAG_END: 'qm:drag-end',
  GALLERY_DROP: 'qm:gallery-drop',
} as const;
