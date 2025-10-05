import { ShapeSizeRestrictions } from '@/core/model';

export interface FileTreeSizeValues {
  fontSize: number;
  iconDimension: number;
  elementHeight: number;
  paddingX: number;
  paddingY: number;
  extraTextTopPadding: number;
  iconTextSpacing: number;
  indentationStep: number;
}

// Symbol -> + Folder - Subfolder * File
// Level -> Level 0: no indentation in Folder / Level 1: 1 indentation (3 spaces) in Subfolder / Level 2: 2 indentations (6 spaces) in File
export interface FileTreeItem {
  type: 'folder' | 'subfolder' | 'file';
  text: string;
  level: number;
}

export interface FileTreeDynamicSizeParams {
  width: number;
  height: number;
  elementHeight: number;
  paddingY: number;
  paddingX: number;
  iconDimension: number;
  indentationStep: number;
  baseRestrictions: ShapeSizeRestrictions;
}
