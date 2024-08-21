import React from 'react';
import { Coord, OtherProps, ShapeModel, ShapeType, Size } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';
import { createShape } from '@/pods/canvas/canvas.model';
import { useHistoryManager } from '@/common/undo-redo';
import { useStateWithInterceptor } from './canvas.hook';
import { createDefaultDocumentModel, DocumentModel } from './canvas.model';
import { v4 as uuidv4 } from 'uuid';
import Konva from 'konva';
import { removeShapeFromList } from './canvas.business';
import { useClipboard } from './use-clipboard.hook';

interface Props {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<Props> = props => {
  const { children } = props;

  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef<Konva.Stage>(null);

  const {
    addSnapshot,
    canRedo: canRedoLogic,
    canUndo: canUndoLogic,
    redo,
    undo,
    getCurrentState: getCurrentUndoHistoryState,
  } = useHistoryManager<DocumentModel>(createDefaultDocumentModel());

  const [document, setDocument, setShapesSkipHistory] =
    useStateWithInterceptor<DocumentModel>(
      createDefaultDocumentModel(),
      addSnapshot
    );

  const selectionInfo = useSelection(document, setDocument);

  const pasteShape = (shape: ShapeModel) => {
    shape.id = uuidv4();

    setDocument(prevDocument => ({
      ...prevDocument,
      shapes: [...prevDocument.shapes, shape],
    }));
  };

  const { copyShapeToClipboard, pasteShapeFromClipboard, canCopy, canPaste } =
    useClipboard(pasteShape, document.shapes, selectionInfo);

  const clearCanvas = () => {
    setDocument({ shapes: [] });
  };

  const deleteSelectedShape = () => {
    setDocument(prevDocument => ({
      ...prevDocument,
      shapes: removeShapeFromList(
        selectionInfo.selectedShapeId,
        prevDocument.shapes
      ),
    }));
  };

  // TODO: instenad of x,y use Coord and reduce the number of arguments
  const addNewShape = (
    type: ShapeType,
    x: number,
    y: number,
    otherProps?: OtherProps
  ) => {
    const newShape = createShape({ x, y }, type, otherProps);

    setDocument(({ shapes }) => {
      const newShapes = [...shapes, newShape];
      return {
        shapes: newShapes,
      };
    });

    return newShape.id;
  };

  const updateShapeSizeAndPosition = (
    id: string,
    position: Coord,
    size: Size
  ) => {
    setDocument(({ shapes }) => ({
      shapes: shapes.map(shape =>
        shape.id === id ? { ...shape, ...position, ...size } : shape
      ),
    }));
  };

  const updateShapePosition = (id: string, { x, y }: Coord) => {
    setDocument(({ shapes }) => ({
      shapes: shapes.map(shape =>
        shape.id === id ? { ...shape, x, y } : shape
      ),
    }));
  };

  const doUndo = () => {
    if (canUndo()) {
      undo();
      setShapesSkipHistory(getCurrentUndoHistoryState());
    }
  };

  const doRedo = () => {
    if (canRedo()) {
      redo();
      setShapesSkipHistory(getCurrentUndoHistoryState());
    }
  };

  const canRedo = () => {
    return canRedoLogic();
  };

  const canUndo = () => {
    return canUndoLogic();
  };

  return (
    <CanvasContext.Provider
      value={{
        shapes: document.shapes,
        scale,
        setScale,
        clearCanvas,
        selectionInfo,
        addNewShape,
        updateShapeSizeAndPosition,
        updateShapePosition,
        canUndo,
        canRedo,
        doUndo,
        doRedo,
        canCopy,
        canPaste,
        copyShapeToClipboard,
        pasteShapeFromClipboard,
        stageRef,
        deleteSelectedShape,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  const context = React.useContext(CanvasContext);
  if (context === null) {
    throw new Error(
      'useCanvasContext: Ensure you have wrapped your app with CanvasProvider'
    );
  }

  return context;
};
