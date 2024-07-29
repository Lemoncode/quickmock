import { ShapeModel } from '@/core/model';

export interface CanvasContextModel {
  shapes: ShapeModel[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeModel[]>>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}
