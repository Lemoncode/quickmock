import { ShapeRefs } from '@/core/model';
import { SelectionInfo } from '@/core/providers/canvas/canvas.model';
import Konva from 'konva';
import { useState } from 'react';
import { SelectionRect } from './canvas.model';
import { getSelectedShapesFromSelectionRect } from './use-multiple-selection.business';

export const useMultipleSelectionShapeHook = (
  selectionInfo: SelectionInfo,
  shapeRefs: React.MutableRefObject<ShapeRefs>
) => {
  const [selectionRect, setSelectionRect] = useState<SelectionRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const handleMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    selectionInfo.handleClearSelection(e);
    if (e.target !== e.target.getStage()) {
      return;
    }

    const pointerPosition = e.target.getStage().getPointerPosition();
    if (pointerPosition === null) {
      return;
    }
    const { x, y } = pointerPosition;
    setSelectionRect({ x, y, width: 0, height: 0, visible: true });
  };

  const handleMouseMove = (e: any) => {
    if (!selectionRect.visible) {
      return;
    }
    const { x, y } = e.target.getStage().getPointerPosition();
    setSelectionRect(prevState => ({
      ...prevState,
      width: x - prevState.x,
      height: y - prevState.y,
    }));
  };

  const handleMouseUp = (_: any) => {
    if (!selectionRect.visible) {
      return;
    }

    // Iterate through all the shapes and check which shapes are inside that rect
    const selectedShapes: string[] = getSelectedShapesFromSelectionRect(
      shapeRefs,
      selectionRect
    );

    setSelectionRect(prevState => ({
      ...prevState,
      visible: false,
    }));
  };

  return {
    selectionRect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
};
