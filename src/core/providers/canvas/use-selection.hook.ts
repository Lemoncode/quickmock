import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { ShapeModel, ShapeRefs, ShapeType } from '@/core/model';
import { SelectionInfo, ZIndexAction } from './canvas.model';
import { performZIndexAction } from './zindex.util';

export const useSelection = (
  shapes: ShapeModel[],
  setShapes: React.Dispatch<React.SetStateAction<ShapeModel[]>>
): SelectionInfo => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});
  const selectedShapeRef = useRef<Konva.Node | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState<string>('');
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(
    null
  );

  // Remove unused shapes
  useEffect(() => {
    const currentIds = shapes.map(shape => shape.id);
    Object.keys(shapeRefs.current).forEach(id => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });
  }, [shapes]);

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
    }
  };

  const setZIndexOnSelected = (action: ZIndexAction) => {
    setShapes(prevShapes =>
      performZIndexAction(selectedShapeId, action, prevShapes)
    );
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
  };
};
