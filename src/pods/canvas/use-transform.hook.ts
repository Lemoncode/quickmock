import { Node, NodeConfig } from 'konva/lib/Node';
import { Coord, ShapeModel, Size } from './canvas.model';
import { Box } from 'konva/lib/shapes/Transformer';
import {
  fitSizeToShapeSizeRestrictions,
  getShapeSizeRestrictions,
} from './canvas.util';
import { ShapeType } from '@/core/model';
import { useRef } from 'react';

function getDecimalPart(value: number) {
  return value - Math.trunc(value);
}

interface TransFormSelectedInfo {
  selectedShapeRef: React.MutableRefObject<Node<NodeConfig> | null>;
  selectedShapeId: string;
  selectedShapeType: ShapeType | null;
  stageScale: number;
}

export const useTransform = (
  setShapes: (value: React.SetStateAction<ShapeModel[]>) => void,
  transformSelectedInfo: TransFormSelectedInfo
) => {
  const { selectedShapeId, selectedShapeRef, selectedShapeType, stageScale } =
    transformSelectedInfo;

  const updateShapeSizeAndPosition = (
    id: string,
    position: Coord,
    size: Size
  ) => {
    setShapes(prevShapes =>
      prevShapes.map(shape =>
        shape.id === id ? { ...shape, ...position, ...size } : shape
      )
    );
  };

  const previousDelta = useRef({ width: 0, height: 0 });

  const handleTransform = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const position = { x: node.x(), y: node.y() };

    let newWidth = (node.width() + previousDelta.current.width) * scaleX;
    let newHeight = (node.height() + previousDelta.current.height) * scaleY;

    previousDelta.current.width = getDecimalPart(newWidth);
    previousDelta.current.height = getDecimalPart(newHeight);
    newWidth = Math.trunc(newWidth);
    newHeight = Math.trunc(newHeight);

    node.scaleX(1);
    node.scaleY(1);

    updateShapeSizeAndPosition(selectedShapeId, position, {
      width: newWidth,
      height: newHeight,
    });
  };

  const handleTransformEnd = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const position = { x: node.x(), y: node.y() };

    const newWidth = (node.width() + previousDelta.current.width) * scaleX;
    const newHeight = (node.height() + previousDelta.current.height) * scaleY;

    node.scaleX(1);
    node.scaleY(1);

    updateShapeSizeAndPosition(selectedShapeId, position, {
      width: newWidth,
      height: newHeight,
    });

    previousDelta.current.width = 0;
    previousDelta.current.height = 0;

    //node.scaleX(1);
    //node.scaleY(1);
  };

  const handleTransformerBoundBoxFunc = (oldBox: Box, newBox: Box): Box => {
    const limitedSize = fitSizeToShapeSizeRestrictions(
      getShapeSizeRestrictions(selectedShapeType),
      newBox.width,
      newBox.height
    );

    console.log(selectedShapeType);
    console.log('** Oldbox', oldBox);
    console.log('** Newbox', newBox);
    console.log('** LimitedSize', limitedSize);
    console.log('+++++++++++++++++++++++++++++');

    return {
      ...newBox,
      width: limitedSize.width,
      height: limitedSize.height,
    };
  };

  return { handleTransform, handleTransformEnd, handleTransformerBoundBoxFunc };
};
