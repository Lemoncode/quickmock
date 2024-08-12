import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { ShapeRefs, ShapeType } from '@/core/model';
import { DocumentModel, SelectionInfo, ZIndexAction } from './canvas.model';
import { performZIndexAction } from './zindex.util';

export const useSelection = (
  document: DocumentModel,
  setDocument: React.Dispatch<React.SetStateAction<DocumentModel>>
): SelectionInfo => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});
  const selectedShapeRef = useRef<Konva.Node | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<string>('');
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

    if (!currentIds.includes(selectedShapeId)) {
      transformerRef.current?.nodes([]);
      selectedShapeRef.current = null;
      setSelectedShapeId('');
      setSelectedShapeType(null);
    }
  }, [document.shapes, selectedShapeId]);

  const handleSelected = (id: string, type: ShapeType) => {
    selectedShapeRef.current = shapeRefs.current[id].current;
    transformerRef?.current?.nodes([shapeRefs.current[id].current]);
    setSelectedShapeId(id);
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
      setSelectedShapeId('');
      setSelectedShapeType(null);
    }
  };

  const setZIndexOnSelected = (action: ZIndexAction) => {
    setDocument(prevDocument => ({
      shapes: performZIndexAction(selectedShapeId, action, prevDocument.shapes),
    }));
  };

  const updateTextOnSelected = (text: string) => {
    setDocument(prevDocument => ({
      shapes: prevDocument.shapes.map(shape =>
        shape.id === selectedShapeId ? { ...shape, text } : shape
      ),
    }));
  };

  return {
    transformerRef,
    shapeRefs,
    handleSelected,
    handleClearSelection,
    selectedShapeRef,
    selectedShapeId,
    selectedShapeType,
    setZIndexOnSelected,
    updateTextOnSelected,
  };
};
