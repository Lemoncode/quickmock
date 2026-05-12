const TEMPLATE_VERSION = '0.1';
const DEFAULT_CANVAS_SIZE = { width: 1920, height: 1080 };

export const QUICKMOCK_FILE_EXTENSION = 'qm';
export const DEFAULT_QUICKMOCK_FILE_NAME = `untitled.${QUICKMOCK_FILE_EXTENSION}`;

export const createEmptyQuickMockContent = (): string =>
  JSON.stringify(
    {
      version: TEMPLATE_VERSION,
      pages: [{ id: 'page-1', name: 'Page 1', shapes: [] }],
      customColors: [],
      size: DEFAULT_CANVAS_SIZE,
    },
    null,
    2
  );
