import { ComboBoxShape } from "@/common/components/shapes";
import { useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { createShape, ShapeModel } from "./canvas.model";
import React from "react";
import { useSelection } from "./useselection.hook";
import Konva from "konva";

interface Size {
  width: number;
  height: number;
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

  const originalSizeSelectedShape = useRef<Size>({ width: 0, height: 0 });
  const currentScaleSelectedShape = useRef<number>(1);

  const handleInnerSelect = (id: string) => {
    const shape = findShape(id);
    if (shape) {
      originalSizeSelectedShape.current = {
        width: shape.width,
        height: shape.height,
      };
      currentScaleSelectedShape.current = 1;
    }
    handleSelect(id);
  };

  const baseLayerRef = useRef<Konva.Layer>(null);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    const { x, y } = e.target.position();
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape))
    );
  };

  const findShape = (id: string) => shapes.find((shape) => shape.id === id);

  const updateShapeSize = (id: string, width: number, height: number) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id ? { ...shape, width, height } : shape
      )
    );
  };

  const handleTransform = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();

    //const scaleY = node.scaleY();
    // Let's start only with scaleX
    currentScaleSelectedShape.current = scaleX;

    const calculatedWidth = transformerRef.current?.width() ?? 0;

    /*const calculatedWidth =
      originalSizeSelectedShape.current.width *
      currentScaleSelectedShape.current;
      */
    console.log("** calculatedWidth", calculatedWidth);

    //selectedShapeRef.current?.width(calculatedWidth);

    // Update the width and height and reset the scale
    // Right now only only on X
    updateShapeSize(
      selectedShapeId,
      calculatedWidth,
      originalSizeSelectedShape.current.height
    );

    node.scaleX(1);
    node.scaleY(1);
  };

  const handleTransformEnd = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();

    //const scaleY = node.scaleY();
    // Let's start only with scaleX
    currentScaleSelectedShape.current = scaleX;

    /*
    const calculatedWidth =
      originalSizeSelectedShape.current.width *
      currentScaleSelectedShape.current;
    console.log("** calculatedWidth", calculatedWidth);
*/
    const calculatedWidth = transformerRef.current?.width() ?? 0;

    //selectedShapeRef.current?.width(calculatedWidth);

    node.scaleX(1);
    node.scaleY(1);

    // Update the width and height and reset the scale
    // Right now only only on X
    updateShapeSize(
      selectedShapeId,
      calculatedWidth,
      originalSizeSelectedShape.current.height
    );

    currentScaleSelectedShape.current = 1;
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
                  onSelected={handleInnerSelect}
                  ref={shapeRefs.current[shape.id]}
                  draggable
                  onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                    handleDragEnd(e, shape.id)
                  }
                  onTransform={handleTransform}
                  onTransformEnd={handleTransformEnd}
                />
              );
            })}
            <Transformer flipEnabled={false} ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
