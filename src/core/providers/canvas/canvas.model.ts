import { Coord, ShapeModel, ShapeRefs, ShapeType, Size } from '@/core/model';
import Konva from 'konva';
import { Node, NodeConfig } from 'konva/lib/Node';

export type ZIndexAction = 'top' | 'bottom' | 'up' | 'down';

export interface SelectionInfo {
  transformerRef: React.RefObject<Konva.Transformer>;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
  handleSelected: (id: string, type: ShapeType) => void;
  handleClearSelection: (
    mouseEvent:
      | Konva.KonvaEventObject<MouseEvent>
      | Konva.KonvaEventObject<TouchEvent>
  ) => void;
  selectedShapeRef: React.MutableRefObject<Node<NodeConfig> | null>;
  selectedShapeId: string;
  selectedShapeType: ShapeType | null;
  setZIndexOnSelected: (action: ZIndexAction) => void;
  updateTextOnSelected: (text: string) => void;
}

export interface CanvasContextModel {
  shapes: ShapeModel[];
  scale: number;
  clearCanvas: () => void;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  addNewShape: (type: ShapeType, x: number, y: number) => void;
  updateShapeSizeAndPosition: (id: string, position: Coord, size: Size) => void;
  updateShapePosition: (id: string, position: Coord) => void;
  selectionInfo: SelectionInfo;
  canUndo: () => boolean;
  canRedo: () => boolean;
  doUndo: () => void;
  doRedo: () => void;
}
