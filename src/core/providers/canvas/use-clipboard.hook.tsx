import { useMemo, useRef, useState } from 'react';
import { ShapeModel } from '@/core/model';
import {
  adjustShapePosition,
  cloneShape,
  findShapeById,
  validateShape,
} from '../../../pods/canvas/clipboard.utils';

export const useClipboard = (
  pasteShape: (shape: ShapeModel) => void,
  shapes: ShapeModel[],
  selectionInfo: { selectedShapeId: string | null }
) => {
  const [clipboardShape, setClipboardShape] = useState<ShapeModel | null>(null);
  const clipboardShapeRef = useRef<ShapeModel | null>(null);
  const copyCount = useRef(1);

  const copyShapeToClipboard = () => {
    const selectedShape = findShapeById(
      selectionInfo.selectedShapeId ?? '',
      shapes
    );
    if (selectedShape) {
      clipboardShapeRef.current = cloneShape(selectedShape);
      setClipboardShape(clipboardShapeRef.current);
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

  const canCopy: boolean = useMemo(() => {
    return !!selectionInfo.selectedShapeId;
  }, [selectionInfo.selectedShapeId]);

  const canPaste: boolean = useMemo(() => {
    return clipboardShapeRef.current !== null;
  }, [clipboardShape]);

  return { copyShapeToClipboard, pasteShapeFromClipboard, canCopy, canPaste };
};
