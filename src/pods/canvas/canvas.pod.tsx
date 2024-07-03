import { ComboBoxShape } from "@/common/components/shapes";
import { useState } from "react";
import { Stage, Layer, Transformer } from "react-konva";
import { createShape, ShapeModel } from "./canvas.model";
import React from "react";
import { useSelection } from "./useselection.hook";

export const CanvasPod = () => {
  const [shapes, _] = useState<ShapeModel[]>([
    createShape(10, 10, 200, 50),
    createShape(90, 170, 250, 50),
  ]);

  const { transformerRef, shapeRefs, handleSelect } = useSelection(shapes);

  return (
    <>
      <div style={{ border: "1px solid black" }}>
        {/* Right now hardcode width and height as soon we get proper layout inherit*/}
        <Stage width={1024} height={800}>
          <Layer>
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
                />
              );
            })}
            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>
      </div>
    </>
  );
};
