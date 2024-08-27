import { ShapeRefs, ShapeType } from '@/core/model';
import Konva from 'konva';

export interface ShapeRendererProps {
  handleSelected: (id: string, type: ShapeType) => void;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
  handleDragEnd: (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => void;
  handleTransform: (e: MouseEvent) => void;
}
