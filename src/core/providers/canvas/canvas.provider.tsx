import React from 'react';
import { Coord, ShapeType, Size } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';
import { createShape } from '@/pods/canvas/canvas.model';
import { useHistoryManager } from '@/common/undo-redo';
import { useStateWithInterceptor } from './canvas.hook';
import { createDefaultDocumentModel, DocumentModel } from './canvas.model';

interface Props {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<Props> = props => {
  const { children } = props;

  //TODO: borrar este comentario
  //const [shapes, setShapes] = React.useState<ShapeModel[]>([]);

  const [scale, setScale] = React.useState(1);

  const {
    addSnapshot,
    canRedo: canRedoLogic,
    canUndo: canUndoLogic,
    redo,
    undo,
    getCurrentState: getCurrentUndoHistoryState,
  } = useHistoryManager<DocumentModel>(createDefaultDocumentModel()); //TODO: Checkthis

  const [document, setDocument, setShapesSkipHistory] =
    useStateWithInterceptor<DocumentModel>(
      createDefaultDocumentModel(),
      addSnapshot
    );

  const selectionInfo = useSelection(document, setDocument);

  const clearCanvas = () => {
    setDocument({ shapes: [] });
  };

  const addNewShape = (type: ShapeType, x: number, y: number) => {
    setDocument(({ shapes }) => {
      const newShapes = [...shapes, createShape({ x, y }, type)];
      return {
        shapes: newShapes,
      };
    });
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
