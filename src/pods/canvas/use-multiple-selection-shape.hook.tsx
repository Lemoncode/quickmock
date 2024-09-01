import { ShapeModel, ShapeRefs, Coord } from '@/core/model';
import { SelectionInfo } from '@/core/providers/canvas/canvas.model';
import Konva from 'konva';
import { useState } from 'react';
import { SelectionRect } from './canvas.model';
import { getSelectedShapesFromSelectionRect } from './use-multiple-selection.business';
import { getTransformerBoxAndCoords } from './transformer.utils';

// There's a bug here: if you make a multiple selectin and start dragging
// inside the selection but on a blank area it won't drag the selection
// it will just clear the selection
//
// What do we need to do here?
//
// We could get the selection transformer current coords and size
//  - if the mouseDown event is click inside that rectangle abort the multiple selection by dragging
//  - We can set a temporary flag here
//  - When user moves check the flag
//  - When user mouse up then reset the flag to false
// #308
// https://github.com/Lemoncode/quickmock/issues/308
export const useMultipleSelectionShapeHook = (
  selectionInfo: SelectionInfo,
  transformerRef: React.RefObject<Konva.Transformer>,
  shapeRefs: React.MutableRefObject<ShapeRefs>,
  shapes: ShapeModel[]
) => {
  const [selectionRect, setSelectionRect] = useState<SelectionRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const isDraggingSelection = (mouseCoords: Coord) => {
    if (!transformerRef.current) {
      return false;
    }

    const transfomerInfo = getTransformerBoxAndCoords(transformerRef);
    if (!transfomerInfo || !transfomerInfo.boxRelativeToStage) {
      return false;
    }

    const { boxRelativeToStage: box } = transfomerInfo;

    if (!box) {
      return false;
    }

    const { x, y, width, height } = box;
    const { x: mouseX, y: mouseY } = mouseCoords;

    return (
      mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height
    );
  };

  const handleMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    const mousePointerCoord = e.target?.getStage()?.getPointerPosition() ?? {
      x: 0,
      y: 0,
    };
    if (isDraggingSelection(mousePointerCoord)) {
      return;
    }

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

  const handleMouseUp = (e: any) => {
    if (!selectionRect.visible) {
      return;
    }

    // Iterate through all the shapes and check which shapes are inside that rect
    const selectedShapes: string[] = getSelectedShapesFromSelectionRect(
      shapeRefs,
      selectionRect
    );

    //selectionInfo.
    // TODO: type should be option parameters in this case
    // Edge case here, you may go with this drag and drop selection
    // and select only one element, then multiple doesn't apply

    // Watch out this case can be a bit confusing, third parameter is null
    // because user is doing multiple selection by dragging and dropping an area
    // not by selecting a shape and at the same time clicking on the CMD/CTRL key
    if (selectedShapes.length === 0) {
      selectionInfo.handleClearSelection(e);
    }

    if (selectedShapes.length === 1) {
      const selectedShapeId = selectedShapes[0];
      const shapeData = shapes.find(shape => shape.id === selectedShapeId);

      selectionInfo.handleSelected(
        selectedShapes,
        shapeData?.type ?? 'multiple',
        false
      );
    }

    if (selectedShapes.length > 1) {
      selectionInfo.handleSelected(selectedShapes, 'multiple', false);
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
