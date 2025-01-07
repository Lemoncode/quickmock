import { useMemo, useRef, useState } from 'react';
import { ShapeModel } from '@/core/model';
import {
  adjustShapesPosition,
  cloneShapes,
  findShapesById,
  validateShapes,
} from '../../../pods/canvas/clipboard.utils';

export const useClipboard = (
  pasteShapes: (shapes: ShapeModel[]) => void,
  shapes: ShapeModel[],
  selectionInfo: { selectedShapesIds: string[] | null },
  dropRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  const [clipboardShape, setClipboardShape] = useState<ShapeModel[] | null>(
    null
  );
  const clipboardShapesRef = useRef<ShapeModel[] | null>(null);
  const copyCount = useRef(1);

  const copyShapesToClipboard = () => {
    const selectedShapes: ShapeModel[] = findShapesById(
      selectionInfo.selectedShapesIds ?? [],
      shapes
    );
    if (selectedShapes) {
      clipboardShapesRef.current = cloneShapes(selectedShapes);
      setClipboardShape(clipboardShapesRef.current);
      copyCount.current = 1;
    }
  };

  const pasteShapeFromClipboard = () => {
    if (clipboardShapesRef.current) {
      const newShapes: ShapeModel[] = cloneShapes(clipboardShapesRef.current);
      validateShapes(newShapes);
      adjustShapesPosition(newShapes, copyCount.current, dropRef);
      pasteShapes(newShapes);
      copyCount.current++;
    }
  };

  const canCopy: boolean = useMemo(() => {
    return !!selectionInfo.selectedShapesIds;
  }, [selectionInfo.selectedShapesIds]);

  const canPaste: boolean = useMemo(() => {
    return clipboardShapesRef.current !== null;
  }, [clipboardShape]);

  return {
    copyShapeToClipboard: copyShapesToClipboard,
    pasteShapeFromClipboard,
    canCopy,
    canPaste,
  };
};
