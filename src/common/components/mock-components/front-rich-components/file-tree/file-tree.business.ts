import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { ShapeSizeRestrictions, Size } from '@/core/model';

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
