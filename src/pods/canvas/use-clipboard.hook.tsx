import { useRef } from 'react';
import { ShapeModel } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import {
  adjustShapePosition,
  cloneShape,
  findShapeById,
  validateShape,
} from './clipboard.utils';

export const useClipboard = () => {
  const { pasteShape, shapes, selectionInfo } = useCanvasContext();
  const clipboardShapeRef = useRef<ShapeModel | null>(null);
  const copyCount = useRef(1);

  const copyShape = () => {
    const selectedShape = findShapeById(selectionInfo.selectedShapeId, shapes);
    if (selectedShape) {
      clipboardShapeRef.current = cloneShape(selectedShape);
      copyCount.current = 1;
    }
  };

  const pasteShapeFromClipboard = () => {
    if (clipboardShapeRef.current) {
      const newShape: ShapeModel = cloneShape(clipboardShapeRef.current);
      validateShape(newShape);
      adjustShapePosition(newShape, copyCount.current);
      pasteShape(newShape);
      copyCount.current++;
    }
  };

  return { copyShape, pasteShapeFromClipboard };
};
