import { ElementSize, Size } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef } from 'react';

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
    // Only update if the text has changed AND the height is different
    const textChanged = previousText.current !== text;

    const finalHeight = Math.max(calculatedSize.height, minHeight);
    const finalSize = { ...calculatedSize, height: finalHeight };

    const heightChanged = finalHeight !== currentSize.height;

    if (textChanged && heightChanged) {
      previousText.current = text;
      updateShapeSizeAndPosition(id, coords, finalSize, false);
    }
  }, [
    text,
    calculatedSize.height,
    currentSize.height,
    id,
    coords.x,
    coords.y,
    updateShapeSizeAndPosition,
  ]);
};

const useFileTreeResizeOnSizeChange = (
  id: string,
  coords: { x: number; y: number },
  currentWidth: number,
  size?: ElementSize
) => {
  const previousSize = useRef(size);
  const { updateShapeSizeAndPosition } = useCanvasContext();

  useEffect(() => {
    // Only update if the size has changed
    if (previousSize.current !== size) {
      previousSize.current = size;

      const newWidth = size === 'XS' ? 150 : 230;

      if (currentWidth !== newWidth) {
        updateShapeSizeAndPosition(
          id,
          coords,
          { width: newWidth, height: currentWidth },
          false
        );
      }
    }
  }, [size, currentWidth, id, coords.x, coords.y, updateShapeSizeAndPosition]);
};

export const useFileTreeResize = (
  id: string,
  coords: { x: number; y: number },
  text: string,
  currentSize: Size,
  calculatedSize: Size,
  minHeight: number,
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

  useFileTreeResizeOnSizeChange(id, coords, currentSize.width, size);
};
