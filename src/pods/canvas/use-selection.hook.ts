import { useEffect, useRef } from "react";
import { ShapeModel } from "./canvas.model";
import Konva from "konva";

type ShapeRefs = {
  [key: string]: React.RefObject<any>;
};

export const useSelection = (shapes: ShapeModel[]) => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});

  // Remove unused shapes
  useEffect(() => {
    const currentIds = shapes.map((shape) => shape.id);
    Object.keys(shapeRefs.current).forEach((id) => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });
  }, [shapes]);

  const handleSelected = (id: string) => {
    transformerRef?.current?.nodes([shapeRefs.current[id].current]);
  };

  return { transformerRef, shapeRefs, handleSelected };
};
