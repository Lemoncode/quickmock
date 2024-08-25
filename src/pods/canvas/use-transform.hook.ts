import { Box } from 'konva/lib/shapes/Transformer';
import { Coord, Size } from '@/core/model';
import { useEffect } from 'react';
import { useCanvasContext } from '@/core/providers';

export const useTransform = (
  updateShapeSizeAndPosition: (id: string, position: Coord, size: Size) => void
) => {
  const { selectedShapeId, selectedShapeRef, transformerRef } =
    useCanvasContext().selectionInfo;

  useEffect(() => {
    const selectedShape = selectedShapeRef.current;
    const transformer = transformerRef.current;
    if (selectedShape && transformer) {
      transformerRef.current.enabledAnchors(
        selectedShape.attrs.typeOfTransformer
      );
    }
  }, [selectedShapeId]);

  const handleTransform = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const position = { x: node.x(), y: node.y() };

    const newWidth = node.width() * scaleX;
    const newHeight = node.height() * scaleY;

    updateShapeSizeAndPosition(selectedShapeId, position, {
      width: newWidth,
      height: newHeight,
    });

    node.scaleX(1);
    node.scaleY(1);
  };

  const handleTransformerBoundBoxFunc = (oldBox: Box, newBox: Box) => {
    const newX = Math.round(newBox.x / 10) * 10;
    const newY = Math.round(newBox.y / 10) * 10;
    const dx = newX - newBox.x;
    const dy = newY - newBox.y;
    newBox.x = newX;
    newBox.y = newY;
    newBox.width = Math.round((newBox.width - dx) / 10) * 10;
    newBox.height = Math.round((newBox.height - dy) / 10) * 10;

    if (newBox.width < 5 || newBox.height < 5) {
      return oldBox;
    }

    return newBox;
  };

  return { handleTransform, handleTransformerBoundBoxFunc };
};
