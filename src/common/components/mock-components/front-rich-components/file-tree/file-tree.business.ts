import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { ElementSize, ShapeSizeRestrictions, Size } from '@/core/model';
import { FONT_SIZE_VALUES } from '../../front-components/shape.const';

interface FileTreeSizeValues {
  fontSize: number;
  iconDimension: number;
  elementHeight: number;
  paddingX: number;
  paddingY: number;
  extraTextTopPadding: number;
  iconTextSpacing: number;
  indentationStep: number;
}

export const getFileTreeSizeValues = (
  size?: ElementSize
): FileTreeSizeValues => {
  switch (size) {
    case 'XS':
      return {
        fontSize: 12,
        iconDimension: 25,
        elementHeight: 30,
        paddingX: 25,
        paddingY: 15,
        extraTextTopPadding: 9,
        iconTextSpacing: 8,
        indentationStep: 15,
      };
    case 'S':
      return {
        fontSize: FONT_SIZE_VALUES.NORMALTEXT,
        iconDimension: 50,
        elementHeight: 60,
        paddingX: 30,
        paddingY: 20,
        extraTextTopPadding: 20,
        iconTextSpacing: 10,
        indentationStep: 27,
      };
    default:
      return {
        fontSize: FONT_SIZE_VALUES.NORMALTEXT,
        iconDimension: 50,
        elementHeight: 60,
        paddingX: 30,
        paddingY: 20,
        extraTextTopPadding: 20,
        iconTextSpacing: 10,
        indentationStep: 25,
      };
  }
};

export const joinTextContent = (text: string): string[] => {
  return text.split(', ');
};

// Symbol -> + Folder - Subfolder * File
// Level -> Level 0: no indentation in Folder / Level 1: 1 indentation (3 spaces) in Subfolder / Level 2: 2 indentations (6 spaces) in File
export interface FileTreeItem {
  type: 'folder' | 'subfolder' | 'file';
  text: string;
  level: number;
}

interface FileTreeDynamicSizeParams {
  width: number;
  elementHeight: number;
  paddingY: number;
  baseRestrictions: ShapeSizeRestrictions;
}

export const parseFileTreeText = (text: string): FileTreeItem[] => {
  return text
    .split('\n')
    .map(line => {
      // First detect indentation
      const indentMatch = line.match(/^(\s*)/);
      const level = indentMatch ? Math.floor(indentMatch[1].length / 3) : 0;
      const trimmed = line.trim();

      if (trimmed === '') return null;

      // Detect symbol
      if (trimmed.startsWith('+ ')) {
        return {
          type: 'folder',
          text: trimmed.substring(2).trim(),
          level: level,
        };
      }

      if (trimmed.startsWith('- ')) {
        return {
          type: 'subfolder',
          text: trimmed.substring(2).trim(),
          level: level,
        };
      }

      if (trimmed.startsWith('* ')) {
        return {
          type: 'file',
          text: trimmed.substring(2).trim(),
          level: level,
        };
      }

      // No symbol: will be treated as a folder
      return {
        type: 'folder',
        text: trimmed,
        level: level,
      };
    })
    .filter((item): item is FileTreeItem => item !== null);
};

export const calculateFileTreeDynamicSize = (
  treeItems: FileTreeItem[],
  params: FileTreeDynamicSizeParams
): Size => {
  const { width, elementHeight, paddingY, baseRestrictions } = params;

  // Calculate minimum height required based on content
  const minContentHeight = treeItems.length * elementHeight + paddingY * 2;

  // Create dynamic constraints with adaptive minimum height
  const dynamicRestrictions: ShapeSizeRestrictions = {
    ...baseRestrictions,
    minHeight: minContentHeight,
    defaultHeight: Math.max(
      baseRestrictions.defaultHeight || 200,
      minContentHeight
    ),
  };

  const finalHeight = minContentHeight;

  return fitSizeToShapeSizeRestrictions(
    dynamicRestrictions,
    width,
    finalHeight
  );
};
