import { ShapeType } from '@/core/model';
import Konva from 'konva';
import { ShapeRefs } from '../canvas.model';

export interface ShapeRendererProps {
  handleSelected: (id: string, type: ShapeType) => void;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
  handleDragEnd: (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => void;
  handleTransform: () => void;
  handleTransformEnd: () => void;
}
