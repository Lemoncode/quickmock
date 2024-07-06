import { useRef } from "react";
import { getDecimalPart } from "./canvas.utils";
import { Coord, ShapeModel, Size } from "./canvas.model";
import Konva from "konva";

export const useTransform = (
  setShapes: (value: React.SetStateAction<ShapeModel[]>) => void,
  shapeNode: Konva.Node | null,
  selectedShapeId: string
) => {
  const TransformSizeDecimalsRef = useRef<Size>({ width: 0, height: 0 });

  // TODO: conside moving this to utils and add unit tests
  const updateShapeSizeAndPosition = (
    id: string,
    position: Coord,
    size: Size
  ) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id ? { ...shape, ...position, ...size } : shape
      )
    );
  };

  const handleTransform = () => {
    const node = shapeNode;
    if (!node) {
      return;
    }

    const scaleX = node?.scaleX() ?? 1;
    const scaleY = node?.scaleY() ?? 1;
    const position = { x: node.x(), y: node.y() };

    let newWidth =
      TransformSizeDecimalsRef.current.width + node.width() * scaleX;
    let newHeight =
      TransformSizeDecimalsRef.current.height + node.height() * scaleY;

    TransformSizeDecimalsRef.current = {
      width: getDecimalPart(newWidth),
      height: getDecimalPart(newHeight),
    };
    newWidth = Math.trunc(newWidth);
    newHeight = Math.trunc(newHeight);

    // Update the width and height and reset the scale
    updateShapeSizeAndPosition(selectedShapeId, position, {
      width: newWidth,
      height: newHeight,
    });

    // Reset the scale to avoid further scaling
    node.scaleX(1);
    node.scaleY(1);
  };

  return {
    handleTransform,
  };
};
