import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { ShapeSizeRestrictions, Size } from '@/core/model';

export const joinTextContent = (text: string): string[] => {
  return text.split(', ');
};

// Symbol -> + Folder - Subfolder * File
export interface FileTreeItem {
  type: 'folder' | 'subfolder' | 'file';
  text: string;
}

interface FileTreeDynamicSizeParams {
  width: number;
  height: number;
  elementHeight: number;
  paddingY: number;
  baseRestrictions: ShapeSizeRestrictions;
}

export const parseFileTreeText = (text: string): FileTreeItem[] => {
  return text
    .split(',')
    .map(line => {
      const trimmed = line.trim();

      if (trimmed === '') return null;

      // Detect symbol
      if (trimmed.startsWith('+ ')) {
        return {
          type: 'folder',
          text: trimmed.substring(2).trim(),
        };
      }

      if (trimmed.startsWith('- ')) {
        return {
          type: 'subfolder',
          text: trimmed.substring(2).trim(),
        };
      }

      if (trimmed.startsWith('* ')) {
        return {
          type: 'file',
          text: trimmed.substring(2).trim(),
        };
      }

      // No symbol: will be treated as a folder
      return {
        type: 'folder',
        text: trimmed,
      };
    })
    .filter((item): item is FileTreeItem => item !== null);
};

export const calculateFileTreeDynamicSize = (
  treeItems: FileTreeItem[],
  params: FileTreeDynamicSizeParams
): Size => {
  const { width, height, elementHeight, paddingY, baseRestrictions } = params;

  // Calculate minimum height required based on content
  const minContentHeight = treeItems.length * elementHeight + paddingY * 2;

  // Create dynamic constraints with adaptive minimum height
  const dynamicRestrictions: ShapeSizeRestrictions = {
    ...baseRestrictions,
    minHeight: minContentHeight,
    defaultHeight: Math.max(
      baseRestrictions.defaultHeight || 280,
      minContentHeight
    ),
  };

  // Use the user's current height, but ensure that it is not less than minContentHeight.
  const finalHeight = Math.max(height, minContentHeight);

  return fitSizeToShapeSizeRestrictions(
    dynamicRestrictions,
    width,
    finalHeight
  );
};
