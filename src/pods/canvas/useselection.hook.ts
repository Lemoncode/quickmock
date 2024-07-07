import Konva from "konva";
import React, { useState } from "react";
import { useEffect, useRef } from "react";
import { ShapeModel } from "./canvas.model";
import { ShapeType } from "@/core/model";

type ShapeRefs = {
  [key: string]: React.RefObject<any>;
};

export const useSelection = (shapes: ShapeModel[]) => {
  const transformerRef = React.useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});
  const selectedShapeRef = useRef<Konva.Node | null>(null);
  const [selectedShapeId, setSelectedShapeId] = useState(""); // Right now single select, TODO: multiple
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(null);

  // Remove unused shapes
  useEffect(() => {
    const currentIds = shapes.map((shape) => shape.id);
    Object.keys(shapeRefs.current).forEach((id) => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });
  }, [shapes]);

  const handleSelect = (id: string, type: ShapeType) => {
    selectedShapeRef.current = shapeRefs.current[id].current;
    transformerRef?.current?.nodes([shapeRefs.current[id].current]);
    // TODO: Deal when unselecting (no shape)
    setSelectedShapeId(id);
    setSelectedShapeType(type);
  };

  return {
    transformerRef,
    shapeRefs,
    handleSelect,
    selectedShapeRef,
    selectedShapeId,
    selectedShapeType,
  };
};
