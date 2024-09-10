import { ShapeModel, ShapeRefs, Coord } from '@/core/model';
import { SelectionInfo } from '@/core/providers/canvas/canvas.model';
import Konva from 'konva';
import { useState } from 'react';
import { SelectionRect } from './canvas.model';
import {
  findFirstShapeInCoords,
  getSelectedShapesFromSelectionRect,
} from './use-multiple-selection.business';
import { getTransformerBoxAndCoords } from './transformer.utils';
import { calculateScaledCoordsFromCanvasDivCoordinatesNoScroll } from './canvas.util';
import { Stage } from 'konva/lib/Stage';
import { isUserDoingMultipleSelectionUsingCtrlOrCmdKey } from '@/common/utils/shapes';

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

interface SelectionRefs {
  transformerRef: React.RefObject<Konva.Transformer>;
  stageRef: React.RefObject<Stage>;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
}

export const useMultipleSelectionShapeHook = (
  selectionInfo: SelectionInfo,
  selectionRefs: SelectionRefs,
  shapes: ShapeModel[]
) => {
  const { transformerRef, stageRef, shapeRefs } = selectionRefs;

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

  const applyZoomScaleToCoords = (mousePointerCoord: Coord): Coord => {
    const stage = stageRef.current;
    if (stage === null) {
      return mousePointerCoord;
    }
    return calculateScaledCoordsFromCanvasDivCoordinatesNoScroll(
      stage,
      mousePointerCoord
    );
  };

  const handleMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>
  ) => {
    let mousePointerStageBasedCoord = e.target
      ?.getStage()
      ?.getPointerPosition() ?? {
      x: 0,
      y: 0,
    };

    // Apply zoom scale
    mousePointerStageBasedCoord = applyZoomScaleToCoords(
      mousePointerStageBasedCoord
    );

    if (isDraggingSelection(mousePointerStageBasedCoord)) {
      return;
    }

    /*
    const shape = findFirstShapeInCoords(shapes, mousePointerStageBasedCoord);

    // If you are not dragging, but you click on a shape you should select that shape
    // and abort the dragging selection (dragging selection must be started from a blank area)
    if (shape) {
      // Temporary fix, casting to any, right now mouse event
      // in the future we will have to provide support for touch events
      selectionInfo.handleSelected(
        [shape.id],
        shape.type,
        isUserDoingMultipleSelectionUsingCtrlOrCmdKey(e as any)
      );
      return;
    }
		*/

    selectionInfo.handleClearSelection(e);
    if (e.target !== e.target.getStage()) {
      return;
    }

    setSelectionRect({
      x: mousePointerStageBasedCoord.x,
      y: mousePointerStageBasedCoord.y,
      width: 0,
      height: 0,
      visible: true,
    });
  };

  const handleMouseMove = (e: any) => {
    if (!selectionRect.visible) {
      return;
    }
    let mousePointerStageBasedCoord = e.target.getStage().getPointerPosition();
    // Apply zoom scale
    mousePointerStageBasedCoord = applyZoomScaleToCoords(
      mousePointerStageBasedCoord
    );

    const { x, y } = mousePointerStageBasedCoord;

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
