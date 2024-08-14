import React from 'react';
import { Coord, ShapeModel, ShapeType, Size, OtherProps } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';
import { createShape } from '@/pods/canvas/canvas.model';
import { useHistoryManager } from '@/common/undo-redo';
import { useStateWithInterceptor } from './canvas.hook';
import { createDefaultDocumentModel, DocumentModel } from './canvas.model';
import { v4 as uuidv4 } from 'uuid';
import Konva from 'konva';
import { removeShapeFromList } from './canvas.business';

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

  const pasteShape = (shape: ShapeModel) => {
    shape.id = uuidv4();

    setDocument(prevDocument => ({
      ...prevDocument,
      shapes: [...prevDocument.shapes, shape],
    }));
  };

  const addNewShape = (type: ShapeType, x: number, y: number) => {
    const newShape = createShape({ x, y }, type);

    setDocument(({ shapes }) => {
      const newShapes = [...shapes, newShape];
      return {
        shapes: newShapes,
      };
    });

    return newShape.id;
  };

  const getSelectedShapeData = (): ShapeModel | undefined => {
    return document.shapes.find(
      shape => shape.id === selectionInfo.selectedShapeId
    );
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

  // TODO: Rather implement this with immer
  const updateOtherPropOnSelected = (propName: string, value: unknown) => {
    setDocument(prevDocument => ({
      ...prevDocument,
      shapes: prevDocument.shapes.map(shape =>
        shape.id === selectionInfo.selectedShapeId
          ? {
              ...shape,
              otherProps: {
                ...shape.otherProps,
                [propName]: value,
              },
            }
          : shape
      ),
    }));
  };

  return (
    <CanvasContext.Provider
      value={{
        shapes: document.shapes,
        scale,
        setScale,
        clearCanvas,
        selectionInfo,
        updateOtherPropOnSelected,
        getSelectedShapeData,
        addNewShape,
        pasteShape,
        updateShapeSizeAndPosition,
        updateShapePosition,
        canUndo,
        canRedo,
        doUndo,
        doRedo,
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
