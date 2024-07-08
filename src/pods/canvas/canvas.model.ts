import { v4 as uuidv4 } from 'uuid';

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

// TODO: create interfaces to hold Coordination and Size
// coordinate: { x: number, y: number }
// size: { width: number, height: number }
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
