import { Box } from 'konva/lib/shapes/Transformer';
import { Coord, Size } from '@/core/model';
import { useEffect } from 'react';
import { useCanvasContext } from '@/core/providers';
import { getMinSizeFromShape } from './model';
import { KonvaEventObject, NodeConfig, Node } from 'konva/lib/Node';

export const useTransform = (
  updateShapeSizeAndPosition: (
    id: string,
    position: Coord,
    size: Size,
    skipHistory: boolean
  ) => void
) => {
  const {
    selectedShapesIds,
    selectedShapesRefs,
    transformerRef,
    selectedShapeType,
  } = useCanvasContext().selectionInfo;

  const setTransfomerSingleSelection = () => {
    if (
      selectedShapesRefs.current == null ||
      selectedShapesRefs.current.length !== 1
    ) {
      return;
    }
    const selectedShape = selectedShapesRefs.current[0];
    const transformer = transformerRef.current;
    if (selectedShape && transformer) {
      transformerRef.current.enabledAnchors(
        selectedShape.attrs.typeOfTransformer
      );
    }
  };

  useEffect(() => {
    // Right now let's only apply anchors when there is a single shape selected
    if (selectedShapesIds.length !== 1) {
      transformerRef.current?.enabledAnchors([]);
    } else {
      setTransfomerSingleSelection();
    }
  }, [selectedShapesIds]);

  const updateSingleItem = (node: Node<NodeConfig>, skipHistory: boolean) => {
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    const position = { x: node.x(), y: node.y() };
    const selectedShapeId = selectedShapesIds[0];

    const newWidth = node.width() * scaleX;
    const newHeight = node.height() * scaleY;

    updateShapeSizeAndPosition(
      selectedShapeId,
      position,
      {
        width: newWidth,
        height: newHeight,
      },
      skipHistory
    );

    node.scaleX(1);
    node.scaleY(1);
  };

  const handleTransform = (e: KonvaEventObject<Event>) => {
    const skipHistory = e.type !== 'transformend';

    const nodes = selectedShapesRefs.current;
    if (!nodes) {
      return;
    }

    if (nodes.length === 1) {
      updateSingleItem(nodes[0], skipHistory);
    } else {
      // TODO: Double check, since it's only movement no need to update the shape
      // it will be automatically updated (we need to update the size because we don't
      // want to apply default scale behavior, we won't resize)
      // ***
      // Just get node x and y
      // updateShapesSizeAndPosition
      // here we update multple shapes
      // rahter call it
      // updateMultipleShapePosition
      // This is going to be though
      // we should calculate the offset and apply to everyshape
      // maybe this is already done by konva and updated in the props?
      // give a try save the document an load
    }
  };

  const handleTransformerBoundBoxFunc = (oldBox: Box, newBox: Box) => {
    const minSize = getMinSizeFromShape(selectedShapeType ?? 'rectangle');
    if (newBox.width < minSize.width || newBox.height < minSize.height) {
      return oldBox;
    }

    return newBox;
  };

  return { handleTransform, handleTransformerBoundBoxFunc };
};
