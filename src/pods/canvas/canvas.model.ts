import { v4 as uuidv4 } from "uuid";

export interface ShapeModel {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const createShape = (
  x: number,
  y: number,
  width: number,
  height: number
): ShapeModel => ({
  id: uuidv4(),
  x,
  y,
  width,
  height,
});
