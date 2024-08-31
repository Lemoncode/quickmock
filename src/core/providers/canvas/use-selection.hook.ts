import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { OtherProps, ShapeModel, ShapeRefs, ShapeType } from '@/core/model';
import { DocumentModel, SelectionInfo, ZIndexAction } from './canvas.model';
import { performZIndexActionMultiple } from './zindex.util';

export const useSelection = (
  document: DocumentModel,
  setDocument: React.Dispatch<React.SetStateAction<DocumentModel>>
): SelectionInfo => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});
  const selectedShapesRefs = useRef<Konva.Node[]>([]);
  const [selectedShapesIds, setSelectedShapesIds] = useState<string[]>([]);
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(
    null
  );

  // Remove unused shapes and reset selectedShapeId if it no longer exists
  useEffect(() => {
    // 1. First cleanup Refs, let's get the list of shape and if there are any
    //    shapeRef that is not in the data Ref let's remove (just performance wise)
    const shapes = document.shapes;
    const currentIds = shapes.map(shape => shape.id);

    Object.keys(shapeRefs.current).forEach(id => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });

    // 2. Now we've got a list of selected shape, let's ensure that at least one of them
    // exists, if not let's wipe the list selection
    //
    // Why only one? Because usually we select a group of shapes, if we keep the selection
    // we can whether remove all, or keep all, if we click outside the selection it should
    // wipe the whole colletion
    if (selectedShapesIds.length > 0) {
      const exists = selectedShapesIds.some(id => currentIds.includes(id));
      if (!exists) {
        transformerRef.current?.nodes([]);
        selectedShapesRefs.current = [];
        setSelectedShapesIds([]);
        setSelectedShapeType(null);
      }
    }
  }, [document.shapes, selectedShapesIds]);

  const handleSelected = (
    ids: string[] | string,
    type: ShapeType,
    isUserDoingMultipleSelection: boolean
  ) => {
    // I want to kniw if the ids is string or array
    const arrayIds = typeof ids === 'string' ? [ids] : ids;

    if (!isUserDoingMultipleSelection) {
      // No multiple selectio, just replace selection with current selected item(s)
      selectedShapesRefs.current = arrayIds.map(
        id => shapeRefs.current[id].current
      );
    } else {
      // Multiple selection, just push what is selected to the current selection
      selectedShapesRefs.current = selectedShapesRefs.current.concat(
        arrayIds.map(id => shapeRefs.current[id].current)
      );
    }

    transformerRef?.current?.nodes(selectedShapesRefs.current);
    //transformerRef?.current?.nodes([shapeRefs.current[id].current]);
    setSelectedShapesIds(arrayIds);
    // Todo set type only if single selection
    setSelectedShapeType(type);
  };

  const handleClearSelection = (
    mouseEvent:
      | Konva.KonvaEventObject<MouseEvent>
      | Konva.KonvaEventObject<TouchEvent>
  ) => {
    if (mouseEvent.target === mouseEvent.target.getStage()) {
      transformerRef.current?.nodes([]);
      selectedShapesRefs.current = [];
      setSelectedShapesIds([]);
      setSelectedShapeType(null);
    }
  };

  const setZIndexOnSelected = (action: ZIndexAction) => {
    setDocument(prevDocument => ({
      shapes: performZIndexActionMultiple(
        selectedShapesIds,
        action,
        prevDocument.shapes
      ),
    }));
  };

  const updateTextOnSelected = (text: string) => {
    // Only when selection is one
    if (selectedShapesIds.length !== 1) {
      return;
    }

    const selectedShapeId = selectedShapesIds[0];
    setDocument(prevDocument => ({
      shapes: prevDocument.shapes.map(shape =>
        shape.id === selectedShapeId ? { ...shape, text } : shape
      ),
    }));
  };

  // TODO: Rather implement this using immmer

  const updateOtherPropsOnSelected = <K extends keyof OtherProps>(
    key: K,
    value: OtherProps[K]
  ) => {
    // TODO: Right now applying this only to single selection
    // in the future we could apply to all selected shapes
    // BUT, we have to show only common shapes (pain in the neck)
    // Only when selection is one
    if (selectedShapesIds.length !== 1) {
      return;
    }

    const selectedShapeId = selectedShapesIds[0];
    setDocument(prevDocument => ({
      shapes: prevDocument.shapes.map(shape =>
        shape.id === selectedShapeId
          ? { ...shape, otherProps: { ...shape.otherProps, [key]: value } }
          : shape
      ),
    }));
  };

  const getSelectedShapeData = (): ShapeModel | undefined => {
    // TODO: we will only allow this when there is a single selection
    // check if it can be applied to multiple data
    if (selectedShapesIds.length !== 1) {
      return;
    }

    const selectedShapeId = selectedShapesIds[0];

    return document.shapes.find(shape => shape.id === selectedShapeId);
  };

  return {
    transformerRef,
    shapeRefs,
    handleSelected,
    handleClearSelection,
    selectedShapesRefs,
    selectedShapesIds,
    selectedShapeType,
    getSelectedShapeData,
    setZIndexOnSelected,
    updateTextOnSelected,
    updateOtherPropsOnSelected,
  };
};
