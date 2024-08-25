import { SelectionInfo } from '@/core/providers/canvas/canvas.model';
import Konva from 'konva';
import { useState } from 'react';

export const useMultipleSelectionShapeHook = (selectionInfo: SelectionInfo) => {
  const [selectionRect, setSelectionRect] = useState({
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
