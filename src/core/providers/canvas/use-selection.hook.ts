import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { OtherProps, ShapeModel, ShapeRefs, ShapeType } from '@/core/model';
import { DocumentModel, SelectionInfo, ZIndexAction } from './canvas.model';
import { performZIndexAction } from './zindex.util';

export const useSelection = (
  document: DocumentModel,
  setDocument: React.Dispatch<React.SetStateAction<DocumentModel>>
): SelectionInfo => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});
  const selectedShapeRef = useRef<Konva.Node | null>(null);
  const [selectedShapesId, setSelectedShapesId] = useState<string[]>([]);
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(
    null
  );

  // Remove unused shapes and reset selectedShapeId if it no longer exists
  useEffect(() => {
    const shapes = document.shapes;
    const currentIds = shapes.map(shape => shape.id);

    Object.keys(shapeRefs.current).forEach(id => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });

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
  }, [document.shapes, selectedShapesId]);

  const handleSelected = (id: string, type: ShapeType) => {
    selectedShapeRef.current = shapeRefs.current[id].current;
    transformerRef?.current?.nodes([shapeRefs.current[id].current]);
    setSelectedShapesId(id);
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
      setSelectedShapesId('');
      setSelectedShapeType(null);
    }
  };

  const setZIndexOnSelected = (action: ZIndexAction) => {
    setDocument(prevDocument => ({
      shapes: performZIndexAction(
        selectedShapesId,
        action,
        prevDocument.shapes
      ),
    }));
  };

  const updateTextOnSelected = (text: string) => {
    setDocument(prevDocument => ({
      shapes: prevDocument.shapes.map(shape =>
        shape.id === selectedShapesId ? { ...shape, text } : shape
      ),
    }));
  };

  // TODO: Rather implement this using immmer

  const updateOtherPropsOnSelected = <K extends keyof OtherProps>(
    key: K,
    value: OtherProps[K]
  ) => {
    setDocument(prevDocument => ({
      shapes: prevDocument.shapes.map(shape =>
        shape.id === selectedShapesId
          ? { ...shape, otherProps: { ...shape.otherProps, [key]: value } }
          : shape
      ),
    }));
  };

  const getSelectedShapeData = (): ShapeModel | undefined =>
    document.shapes.find(shape => shape.id === selectedShapesId);

  return {
    transformerRef,
    shapeRefs,
    handleSelected,
    handleClearSelection,
    selectedShapeRef,
    selectedShapeId: selectedShapesId,
    selectedShapeType,
    getSelectedShapeData,
    setZIndexOnSelected,
    updateTextOnSelected,
    updateOtherPropsOnSelected,
  };
};
