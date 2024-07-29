import { ShapeModel } from '@/core/model';

export interface CanvasContextModel {
  shapes: ShapeModel[];
  setShapes: React.Dispatch<React.SetStateAction<ShapeModel[]>>;
}
