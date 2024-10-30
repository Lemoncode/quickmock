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
import { isPageIndexValid, removeShapesFromList } from './canvas.business';
import { useClipboard } from './use-clipboard.hook';
import { produce } from 'immer';

interface Props {
  children: React.ReactNode;
}

export const CanvasProvider: React.FC<Props> = props => {
  const { children } = props;

  const [scale, setScale] = React.useState(1);
  const stageRef = React.useRef<Konva.Stage>(null);
  const [isInlineEditing, setIsInlineEditing] = React.useState(false);
  const [fileName, setFileName] = React.useState<string>('');
  const [isThumbnailContextMenuVisible, setIsThumbnailContextMenuVisible] =
    React.useState(false);

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

  const addNewPage = () => {
    setDocument(lastDocument =>
      produce(lastDocument, draft => {
        draft.pages.push({
          id: uuidv4(),
          name: `Page ${draft.pages.length + 1}`,
          shapes: [],
        });
      })
    );
  };

  const duplicatePage = (pageIndex: number) => {
    const newShapes: ShapeModel[] = document.pages[pageIndex].shapes.map(
      shape => {
        const newShape: ShapeModel = { ...shape };
        newShape.id = uuidv4();
        return newShape;
      }
    );

    setDocument(lastDocument =>
      produce(lastDocument, draft => {
        const newPage = {
          id: uuidv4(),
          name: `Page ${draft.pages.length + 1}`,
          shapes: newShapes,
        };
        draft.pages.push(newPage);
        setActivePage(newPage.id);
      })
    );
  };

  const deletePage = (pageIndex: number) => {
    const newActivePageId =
      pageIndex < document.pages.length - 1
        ? document.pages[pageIndex + 1].id // If it's not the last page, select the next one
        : document.pages[pageIndex - 1].id; // Otherwise, select the previous one

    setDocument(lastDocument =>
      produce(lastDocument, draft => {
        draft.pages = draft.pages.filter(
          currentPage => document.pages[pageIndex].id !== currentPage.id
        );
      })
    );

    setActivePage(newActivePageId);
  };

  const setActivePage = (pageId: string) => {
    selectionInfo.clearSelection();
    selectionInfo.shapeRefs.current = {};

    setDocument(lastDocument =>
      produce(lastDocument, draft => {
        const pageIndex = draft.pages.findIndex(page => page.id === pageId);
        if (pageIndex !== -1) {
          draft.activePageIndex = pageIndex;
        }
      })
    );
  };

  const pasteShapes = (shapes: ShapeModel[]) => {
    const newShapes: ShapeModel[] = shapes.map(shape => {
      shape.id = uuidv4();
      return shape;
    });

    if (isPageIndexValid(document)) {
      setDocument(lastDocument =>
        produce(lastDocument, draft => {
          draft.pages[lastDocument.activePageIndex].shapes.push(...newShapes);
        })
      );
    }

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
    useClipboard(
      pasteShapes,
      document.pages[document.activePageIndex].shapes,
      selectionInfo
    );

  const createNewFullDocument = () => {
    setDocument(createDefaultDocumentModel());
  };

  const deleteSelectedShapes = () => {
    if (isPageIndexValid(document)) {
      setDocument(lastDocument =>
        produce(lastDocument, draft => {
          draft.pages[lastDocument.activePageIndex].shapes =
            removeShapesFromList(
              selectionInfo.selectedShapesIds,
              draft.pages[lastDocument.activePageIndex].shapes
            );
        })
      );
    }
  };

  // TODO: instenad of x,y use Coord and reduce the number of arguments
  const addNewShape = (
    type: ShapeType,
    x: number,
    y: number,
    otherProps?: OtherProps
  ) => {
    if (!isPageIndexValid(document)) {
      return '';
    }

    const newShape = createShape({ x, y }, type, otherProps);

    setDocument(lastDocument =>
      produce(lastDocument, draft => {
        draft.pages[lastDocument.activePageIndex].shapes.push(newShape);
      })
    );

    return newShape.id;
  };

  const updateShapeSizeAndPosition = (
    id: string,
    position: Coord,
    size: Size,
    skipHistory: boolean = false
  ) => {
    if (!isPageIndexValid(document)) {
      return;
    }

    if (skipHistory) {
      setShapesSkipHistory(fullDocument => {
        return produce(fullDocument, draft => {
          draft.pages[document.activePageIndex].shapes = draft.pages[
            document.activePageIndex
          ].shapes.map(shape =>
            shape.id === id ? { ...shape, ...position, ...size } : shape
          );
        });
      });
    } else {
      setDocument(fullDocument => {
        return produce(fullDocument, draft => {
          draft.pages[document.activePageIndex].shapes = draft.pages[
            document.activePageIndex
          ].shapes.map(shape =>
            shape.id === id ? { ...shape, ...position, ...size } : shape
          );
        });
      });
    }
  };

  const updateShapePosition = (id: string, { x, y }: Coord) => {
    if (isPageIndexValid(document)) {
      setDocument(fullDocument => {
        return produce(fullDocument, draft => {
          draft.pages[document.activePageIndex].shapes = draft.pages[
            document.activePageIndex
          ].shapes.map(shape => (shape.id === id ? { ...shape, x, y } : shape));
        });
      });
    }
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
        shapes: document.pages[document.activePageIndex].shapes ?? [],
        scale,
        setScale,
        createNewFullDocument,
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
        fileName,
        setFileName,
        fullDocument: document,
        addNewPage,
        duplicatePage,
        setActivePage,
        deletePage,
        isThumbnailContextMenuVisible,
        setIsThumbnailContextMenuVisible,
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
