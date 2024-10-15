import React from 'react';
import { Coord, OtherProps, ShapeModel, ShapeType, Size } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';
import { createShape } from '@/pods/canvas/model';
import { useHistoryManager } from '@/common/undo-redo';
import { useStateWithInterceptor } from './canvas.hook';
import { createDefaultDocumentModel, DocumentModel } from './canvas.model';
import { v4 as uuidv4 } from 'uuid';
import Konva from 'konva';
import { removeShapesFromList } from './canvas.business';
import { useClipboard } from './use-clipboard.hook';

interface Props {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<Props> = props => {
  const { children } = props;

  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef<Konva.Stage>(null);
  const [isInlineEditing, setIsInlineEditing] = React.useState(false);

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

  const pasteShapes = (shapes: ShapeModel[]) => {
    const newShapes: ShapeModel[] = shapes.map(shape => {
      shape.id = uuidv4();
      return shape;
    });

    setDocument(prevDocument => ({
      ...prevDocument,
      shapes: [...prevDocument.shapes, ...newShapes],
    }));

    // Just select the new pasted shapes
    // need to wait for the shapes to be rendered (previous set document is async)
    setTimeout(() => {
      if (newShapes.length == 1) {
        selectionInfo.handleSelected(
          newShapes.map(shape => shape.id),
          shapes[0].type,
          false
        );
      } else {
        selectionInfo.handleSelected(
          newShapes.map(shape => shape.id),
          'multiple',
          false
        );
      }
    });
  };

  const { copyShapeToClipboard, pasteShapeFromClipboard, canCopy, canPaste } =
    useClipboard(pasteShapes, document.shapes, selectionInfo);

  const clearCanvas = () => {
    setDocument({ shapes: [] });
  };

  const deleteSelectedShapes = () => {
    setDocument(prevDocument => ({
      ...prevDocument,
      shapes: removeShapesFromList(
        selectionInfo.selectedShapesIds,
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
    size: Size,
    skipHistory: boolean = false
  ) => {
    if (skipHistory) {
      setShapesSkipHistory(({ shapes }) => ({
        shapes: shapes.map(shape =>
          shape.id === id ? { ...shape, ...position, ...size } : shape
        ),
      }));
    } else {
      setDocument(({ shapes }) => ({
        shapes: shapes.map(shape =>
          shape.id === id ? { ...shape, ...position, ...size } : shape
        ),
      }));
    }
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

  const loadDocument = (document: DocumentModel) => {
    setDocument(document);
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
        deleteSelectedShapes,
        loadDocument,
        isInlineEditing,
        setIsInlineEditing,
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
