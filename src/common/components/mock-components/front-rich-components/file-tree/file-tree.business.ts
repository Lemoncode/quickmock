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
  paddingX: number;
  iconDimension: number;
  indentationStep: number;
  baseRestrictions: ShapeSizeRestrictions;
}

export const parseFileTreeText = (text: string): FileTreeItem[] => {
  return text
    .split('\n')
    .map(line => {
      // First detect indentation
      const indentMatch = line.match(/^(\s*)/);
      const level = indentMatch ? Math.floor(indentMatch[1].length / 3) : 0;
      const trimmedStart = line.trimStart();

      if (trimmedStart === '') return null;

      // Detect symbol
      if (trimmedStart.startsWith('+ ')) {
        return {
          type: 'folder',
          text: trimmedStart.substring(2).trim(),
          level: level,
        };
      }

      if (trimmedStart.startsWith('- ')) {
        return {
          type: 'subfolder',
          text: trimmedStart.substring(2).trim(),
          level: level,
        };
      }

      if (trimmedStart.startsWith('* ')) {
        return {
          type: 'file',
          text: trimmedStart.substring(2).trim(),
          level: level,
        };
      }

      // No symbol: will be treated as a folder
      const trimmed = line.trim();
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
  const {
    width,
    elementHeight,
    paddingY,
    paddingX,
    iconDimension,
    indentationStep,
    baseRestrictions,
  } = params;

  const maxIconX = Math.max(
    ...treeItems.map(item => paddingX + item.level * indentationStep)
  );
  const requiredWidth = maxIconX + iconDimension + paddingX;

  // Calculate minimum height required based on content
  const minContentHeight = treeItems.length * elementHeight + paddingY * 2;

  // Create dynamic constraints for content-based sizing
  const dynamicRestrictions: ShapeSizeRestrictions = {
    ...baseRestrictions,
    minWidth: Math.max(baseRestrictions.minWidth, requiredWidth),
    defaultHeight: minContentHeight,
  };

  const finalHeight = minContentHeight;

  return fitSizeToShapeSizeRestrictions(
    dynamicRestrictions,
    width,
    finalHeight
  );
};
