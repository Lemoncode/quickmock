import Konva from "konva";
import React from "react";
import { useEffect, useRef } from "react";
import { ShapeModel } from "./canvas.model";

type ShapeRefs = {
  [key: string]: React.RefObject<any>;
};

export const useSelection = (shapes : ShapeModel[]) => {
  const transformerRef = React.useRef<Konva.Transformer>(null);
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

  const handleSelect = (id: string) => {
    transformerRef?.current?.nodes([shapeRefs.current[id].current]);
  };

  return {
    transformerRef,
    shapeRefs,
    handleSelect,
  };
};
