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

export interface CanvasSize {
  width: number;
  height: number;
}

export type ZIndexAction = 'top' | 'bottom' | 'up' | 'down';

export interface Page {
  id: string;
  name: string;
  shapes: ShapeModel[];
}

export interface DocumentModel {
  pages: Page[];
  activePageIndex: number;
  customColors: (string | null)[];
  size: {
    width: number;
    height: number;
  };
}

export const createDefaultCanvasSize = (): CanvasSize => ({
  width: 3000,
  height: 3000,
});

export const createDefaultDocumentModel = (): DocumentModel => ({
  activePageIndex: 0,
  pages: [
    {
      id: '1',
      name: 'Page 1',
      shapes: [],
    },
  ],
  customColors: new Array(APP_CONSTANTS.COLOR_SLOTS).fill(null),
  size: createDefaultCanvasSize(),
});

export interface SelectionInfo {
  transformerRef: React.RefObject<Konva.Transformer>;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
  handleSelected: (
    id: string[] | string,
    type: ShapeType,
    isUserDoingMultipleSelection: boolean
  ) => void;
  handleClearSelection: (
    mouseEvent?:
      | Konva.KonvaEventObject<MouseEvent>
      | Konva.KonvaEventObject<TouchEvent>
  ) => void;
  clearSelection: () => void;
  selectedShapesRefs: React.MutableRefObject<Node<NodeConfig>[] | null>;
  selectedShapesIds: string[];
  selectedShapeType: ShapeType | null;
  getSelectedShapeData: (index?: number) => ShapeModel | undefined;
  getAllSelectedShapesData: () => ShapeModel[];
  setZIndexOnSelected: (action: ZIndexAction) => void;
  updateTextOnSelected: (text: string) => void;
  // TODO: Update, A. KeyOf B. Move To useSelectionInfo
  updateOtherPropsOnSelected: <K extends keyof OtherProps>(
    key: K,
    value: OtherProps[K],
    multipleSelection?: boolean
  ) => void;
}

export interface CanvasContextModel {
  shapes: ShapeModel[];
  scale: number;
  createNewFullDocument: () => void;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  addNewShape: (
    type: ShapeType,
    x: number,
    y: number,
    otherProps?: OtherProps
  ) => string;
  updateShapeSizeAndPosition: (
    id: string,
    position: Coord,
    size: Size,
    skipHistory: boolean
  ) => void;
  updateShapePosition: (id: string, position: Coord) => void;
  stageRef: React.RefObject<Konva.Stage>;
  selectionInfo: SelectionInfo;
  deleteSelectedShapes: (id: string[]) => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  doUndo: () => void;
  doRedo: () => void;
  canCopy: boolean;
  canPaste: boolean;
  copyShapeToClipboard: () => void;
  pasteShapeFromClipboard: () => void;
  loadDocument: (document: DocumentModel) => void;
  isInlineEditing: boolean;
  setIsInlineEditing: React.Dispatch<React.SetStateAction<boolean>>;
  fileName: string;
  setFileName: (fileName: string) => void;
  fullDocument: DocumentModel;
  addNewPage: () => void;
  duplicatePage: (pageIndex: number) => void;
  getActivePage: () => Page;
  getActivePageName: () => string;
  setActivePage: (pageId: string) => void;
  deletePage: (pageIndex: number) => void;
  editPageTitle: (pageIndex: number, newName: string) => void;
  swapPages: (id1: string, id2: string) => void;
  activePageIndex: number;
  isThumbnailContextMenuVisible: boolean;
  setIsThumbnailContextMenuVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  howManyLoadedDocuments: number;
  canvasSize: CanvasSize;
  setCanvasSize: (canvasDimensions: CanvasSize) => void;
  customColors: (string | null)[];
  updateColorSlot: (color: string, index: number) => void;
  dropRef: React.MutableRefObject<HTMLDivElement | null>;
  setDropRef: (dropRef: React.MutableRefObject<HTMLDivElement | null>) => void;
  setIsDirty: (dirty: boolean) => void;
  loadSampleDocument: boolean;
  setLoadSampleDocument: React.Dispatch<React.SetStateAction<boolean>>;
}

export const APP_CONSTANTS = {
  COLOR_SLOTS: 16,
} as const;
