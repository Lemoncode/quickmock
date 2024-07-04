import { ComboBoxShape } from "@/common/components/shapes";
import { useRef, useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { createShape, ShapeModel } from "./canvas.model";
import React from "react";
import { useSelection } from "./useselection.hook";
import Konva from "konva";

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

  /*
  const handleTransform = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }
    // adjust size to scale
    const formerNodeWidth = node.width();
    const formerNodeHeight = node.height();

    const newWidth = node.width() * node.scaleX();
    const newHeight = node.height() * node.scaleY();
    node.width(newWidth);
    node.height(newHeight);

    // reset scale to 1
    if (Math.floor(formerNodeWidth) !== Math.floor(node.width())) {
      console.log("Scale before: ", node.scaleX());
      node.scaleX(1);
      console.log("Scale 1: ", node.scaleX());
      updateShapeSize(selectedShapeId, newWidth, newHeight);
    } else {
      console.log("width not changed");
      console.log("** Scale: ", node.scaleX());
    }

    if (formerNodeHeight !== node.height()) {
      node.scaleY(1);
      updateShapeSize(selectedShapeId, newWidth, newHeight);
    }

    baseLayerRef?.current?.batchDraw();
  };
  */

  const handleTransformEnd = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // we will reset it back
    node.scaleX(1);
    node.scaleY(1);
  };

  /*
  const handleTransformEnd = () => {
    const node = selectedShapeRef.current;
    if (!node) {
      return;
    }

    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    const newWidth = node?.width() ?? 0 * scaleX;
    const newHeight = node?.height() ?? 0 * scaleY;

    // Update the width and height and reset the scale
    updateShapeSize(selectedShapeId, newWidth, newHeight);

    node.scaleX(1);
    node.scaleY(1);
  };
*/

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
