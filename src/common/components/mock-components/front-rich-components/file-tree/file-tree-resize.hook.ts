import { ElementSize, Size } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef } from 'react';
import { FileTreeItem, FileTreeSizeValues } from './file-tree.model';

// Hook to resize edition text area based on content
const useFileTreeResizeOnContentChange = (
  id: string,
  coords: { x: number; y: number },
  text: string,
  currentSize: Size,
  calculatedSize: Size,
  minHeight: number
) => {
  const previousText = useRef(text);
  const { updateShapeSizeAndPosition } = useCanvasContext();

  useEffect(() => {
    const textChanged = previousText.current !== text;

    const finalHeight = Math.max(calculatedSize.height, minHeight);
    const finalSize = { ...calculatedSize, height: finalHeight };

    const sizeChanged =
      finalHeight !== currentSize.height ||
      calculatedSize.width !== currentSize.width;

    if (textChanged && sizeChanged) {
      previousText.current = text;
      updateShapeSizeAndPosition(id, coords, finalSize, false);
    } else if (sizeChanged) {
      // If only the size has changed, also resize
      updateShapeSizeAndPosition(id, coords, finalSize, false);
    }
  }, [
    text,
    calculatedSize.height,
    calculatedSize.width,
    currentSize.height,
    currentSize.width,
    id,
    coords.x,
    coords.y,
    updateShapeSizeAndPosition,
  ]);
};

// Hook to force width change when ElementSize changes (XS ↔ S)
// This ensures that when dropping a component and changing from S to XS (or vice versa),
// the component doesn't maintain the previous width but forces the correct one:
// - XS: 150px width
// - S: 230px width

const useFileTreeResizeOnSizeChange = (
  id: string,
  coords: { x: number; y: number },
  currentSize: Size,
  treeItems: FileTreeItem[],
  sizeValues: FileTreeSizeValues,
  size?: ElementSize
) => {
  const previousSize = useRef(size);
  const { updateShapeSizeAndPosition } = useCanvasContext();

  useEffect(() => {
    // Only update if the size has changed
    if (previousSize.current !== size) {
      previousSize.current = size;

      const newWidth = size === 'XS' ? 150 : 230;

      const minContentHeight =
        treeItems && sizeValues
          ? treeItems.length * sizeValues.elementHeight +
            sizeValues.paddingY * 2
          : currentSize.height;

      if (
        currentSize.width !== newWidth ||
        currentSize.height !== minContentHeight
      ) {
        updateShapeSizeAndPosition(
          id,
          coords,
          { width: newWidth, height: minContentHeight },
          false
        );
      }
    }
  }, [
    size,
    currentSize.width,
    currentSize.height,
    id,
    coords.x,
    coords.y,
    updateShapeSizeAndPosition,
    treeItems,
    sizeValues,
  ]);
};

export const useFileTreeResize = (
  id: string,
  coords: { x: number; y: number },
  text: string,
  currentSize: Size,
  calculatedSize: Size,
  minHeight: number,
  treeItems: FileTreeItem[],
  sizeValues: FileTreeSizeValues,
  size?: ElementSize
) => {
  useFileTreeResizeOnContentChange(
    id,
    coords,
    text,
    currentSize,
    calculatedSize,
    minHeight
  );

  useFileTreeResizeOnSizeChange(
    id,
    coords,
    currentSize,

    treeItems,
    sizeValues,
    size
  );
};
