import {
  ComboBoxShape,
  getComboBoxShapeSizeRestrictions,
} from "@/common/components/shapes";
import { useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { createShape, ShapeModel } from "./canvas.model";
import React from "react";
import { useSelection } from "./useselection.hook";
import Konva from "konva";
import { useTransform } from "./usetransform.hook";
import {
  fitBoxToShapeSizeRestrictions as fitSizeToShapeSizeRestrictions,
  getShapeSizeRestrictions,
} from "./canvas.utils";

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
    selectedShapeType,
  } = useSelection(shapes);

  const baseLayerRef = useRef<Konva.Layer>(null);

  const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>, id: string) => {
    const { x, y } = e.target.position();
    setShapes((prevShapes) =>
      prevShapes.map((shape) => (shape.id === id ? { ...shape, x, y } : shape))
    );
  };

  const { handleTransform } = useTransform(
    setShapes,
    selectedShapeRef.current,
    selectedShapeId
  );

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
              boundBoxFunc={(_, newBox) => {
                const { width, height } = newBox;

                const limitedRect = fitSizeToShapeSizeRestrictions(
                  getShapeSizeRestrictions(selectedShapeType),
                  width,
                  height
                );

                return {
                  ...newBox,
                  width: limitedRect.width,
                  height: limitedRect.height,
                };
              }}
            />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
