import { v4 as uuidv4 } from "uuid";

// TODO: this should move to core/model
export interface Size {
  width: number;
  height: number;
}

export interface Coord {
  x: number;
  y: number;
}

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
