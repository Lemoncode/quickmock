export interface QmShape {
  id: string;
  type: string;
  otherProps?: {
    imageSrc?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface QmPage {
  id: string;
  name: string;
  shapes: QmShape[];
}

export interface QmFileContract {
  version: string;
  pages: QmPage[];
  customColors: (string | null)[];
  size: { width: number; height: number };
}

export interface QmFile {
  absPath: string;
  content: string;
  parsed: QmFileContract;
}
