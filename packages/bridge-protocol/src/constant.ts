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
