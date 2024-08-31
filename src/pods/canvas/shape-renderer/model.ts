import { ShapeRefs, ShapeType } from '@/core/model';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/lib/Node';

export interface ShapeRendererProps {
  handleSelected: (
    id: string[],
    type: ShapeType,
    isUserDoingMultipleSelection: boolean
  ) => void;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
  handleDragEnd: (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => void;
  handleTransform: (e: KonvaEventObject<Event>) => void;
}
