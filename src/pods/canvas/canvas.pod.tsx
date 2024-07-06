import { ComboBoxShape } from "@/common/components/shapes";
import { useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { createShape, ShapeModel } from "./canvas.model";
import React from "react";
import { useSelection } from "./useselection.hook";
import Konva from "konva";

// TODO: this should move to model
interface Size {
  width: number;
  height: number;
}

interface Coord {
  x: number;
  y: number;
}

// TODO: this should be moved to business or utils and added unit tests
function getDecimalPart(num: number): number {
  // Get intenger part
  const integerPart = Math.trunc(num);
  // Substract integer to num obtain decimal part
  const decimalPart = num - integerPart;
  return decimalPart;
}

export const CanvasPod = () => {
  const [shapes, setShapes] = useState<ShapeModel[]>([
    createShape(10, 10, 200, 50),
    createShape(90, 170, 250, 50),
  ]);

  const {
    transformerRef,
    shapeRefs,
    handleSelect,
    selectedShapeRef,
    selectedShapeId,
  } = useSelection(shapes);

  const TransformSizeDecimalsRef = useRef<Size>({ width: 0, height: 0 });

  const baseLayerRef = useRef<Konva.Layer>(null);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    const { x, y } = e.target.position();
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape))
    );
  };

  const findShape = (id: string) => shapes.find((shape) => shape.id === id);

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
    const node = selectedShapeRef.current;
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

  return (
    <>
      <div style={{ border: "1px solid black" }}>
        {/* Right now hardcode width and height as soon we get proper layout inherit*/}
        <Stage width={1024} height={800}>
          <Layer ref={baseLayerRef}>
            {shapes.map((shape, index) => {
              if (!shapeRefs.current[shape.id]) {
                shapeRefs.current[shape.id] = React.createRef();
              }

              return (
                <ComboBoxShape
                  id={shape.id}
                  key={index}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  onSelected={handleSelect}
                  ref={shapeRefs.current[shape.id]}
                  draggable
                  onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                    handleDragEnd(e, shape.id)
                  }
                  onTransform={handleTransform}
                  onTransformEnd={handleTransform}
                />
              );
            })}
            {/* TODO: boundBoxFunc should be generic and get adapted by item type */}
            <Transformer
              flipEnabled={false}
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                const { width, height } = newBox;
                const limitedBox = { ...newBox };
                limitedBox.width = width < 110 ? oldBox.width : width;
                limitedBox.height = height < 50 ? oldBox.height : height;

                return limitedBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
