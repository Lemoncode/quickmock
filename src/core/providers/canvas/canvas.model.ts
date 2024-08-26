import {
  Coord,
  OtherProps,
  ShapeModel,
  ShapeRefs,
  ShapeType,
  Size,
} from '@/core/model';
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
  getSelectedShapeData: () => ShapeModel | undefined;
  setZIndexOnSelected: (action: ZIndexAction) => void;
  updateTextOnSelected: (text: string) => void;
  // TODO: Update, A. KeyOf B. Move To useSelectionInfo
  updateOtherPropsOnSelected: <K extends keyof OtherProps>(
    key: K,
    value: OtherProps[K]
  ) => void;
}

export interface CanvasContextModel {
  shapes: ShapeModel[];
  scale: number;
  clearCanvas: () => void;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  addNewShape: (
    type: ShapeType,
    x: number,
    y: number,
    otherProps?: OtherProps
  ) => string;
  updateShapeSizeAndPosition: (id: string, position: Coord, size: Size) => void;
  updateShapePosition: (id: string, position: Coord) => void;
  stageRef: React.RefObject<Konva.Stage>;
  selectionInfo: SelectionInfo;
  deleteSelectedShape: (id: string) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  doUndo: () => void;
  doRedo: () => void;
  canCopy: boolean;
  canPaste: boolean;
  copyShapeToClipboard: () => void;
  pasteShapeFromClipboard: () => void;
  loadDocument: (document: DocumentModel) => void;
}

export interface DocumentModel {
  shapes: ShapeModel[];
}

export const createDefaultDocumentModel = (): DocumentModel => ({
  shapes: [],
});
