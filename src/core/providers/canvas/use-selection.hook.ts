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
  const selectedShapeRef = useRef<Konva.Node | null>(null);
  const [selectedShapesIds, setSelectedShapesIds] = useState<string[]>([]);
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(
    null
  );

  // Remove unused shapes and reset selectedShapeId if it no longer exists
  useEffect(() => {
    //const shapes = document.shapes;
    //const currentIds = shapes.map(shape => shape.id);
    // TODO: Fix this, right now we have multipleshapes
    /*
    Object.keys(shapeRefs.current).forEach(id => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });*/
    // TODO: Fix this, right now we have multipleshapes
    // We have check if the currentId is on the selectedShape
    // if it is remove it
    // once all is checked if selectedShape is empty then
    // cleanup transformerRef, and selectionShape
    /*if (!currentIds.includes(selectedShapeId)) {
      transformerRef.current?.nodes([]);
      selectedShapeRef.current = null;
      setSelectedShapeId('');
      setSelectedShapeType(null);
    }*/
  }, [document.shapes, selectedShapesIds]);

  const handleSelected = (ids: string[], type: ShapeType) => {
    //selectedShapeRef.current = shapeRefs.current[id].current;
    const selectedShapeRefs = ids.map(id => shapeRefs.current[id].current);

    transformerRef?.current?.nodes(selectedShapeRefs);
    //transformerRef?.current?.nodes([shapeRefs.current[id].current]);
    setSelectedShapesIds(ids);
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
      selectedShapeRef.current = null;
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
    selectedShapeRef,
    selectedShapesIds,
    selectedShapeType,
    getSelectedShapeData,
    setZIndexOnSelected,
    updateTextOnSelected,
    updateOtherPropsOnSelected,
  };
};
