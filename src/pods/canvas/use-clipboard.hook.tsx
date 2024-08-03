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

  const copyShape = () => {
    const selectedShape = findShapeById(selectionInfo.selectedShapeId, shapes);
    if (selectedShape) {
      clipboardShapeRef.current = cloneShape(selectedShape);
    }
  };

  const pasteShapeFromClipboard = () => {
    if (clipboardShapeRef.current) {
      const newShape: ShapeModel = cloneShape(clipboardShapeRef.current);
      validateShape(newShape);
      adjustShapePosition(newShape);
      pasteShape(newShape);
    }
  };

  return { copyShape, pasteShapeFromClipboard };
};
