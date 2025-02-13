import React from 'react';
import { Coord, OtherProps, ShapeModel, ShapeType, Size } from '@/core/model';
import { CanvasContext } from './canvas.context';
import { useSelection } from './use-selection.hook';
import { createShape } from '@/pods/canvas/model';
import { useHistoryManager } from '@/common/undo-redo';
import { useStateWithInterceptor } from './canvas.hook';
import {
  createDefaultCanvasSize,
  createDefaultDocumentModel,
  DocumentModel,
} from './canvas.model';
import { v4 as uuidv4 } from 'uuid';
import Konva from 'konva';
import { isPageIndexValid, removeShapesFromList } from './canvas.business';
import { useClipboard } from './use-clipboard.hook';
import { produce } from 'immer';
import { APP_CONSTANTS } from './canvas.model';
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
  const [howManyLoadedDocuments, setHowManyLoadedDocuments] = React.useState(0);
  const [canvasSize, setCanvasSize] = React.useState(createDefaultCanvasSize());
  const [loadSampleDocument, setLoadSampleDocument] = React.useState(true);

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

  const [isDirty, setIsDirty] = React.useState(false);

  const setDocumentAndMarkDirtyState = (
    updater: DocumentModel | ((prev: DocumentModel) => DocumentModel),
    isDirty = true
  ) => {
    setDocument(updater);
    setIsDirty(isDirty);
  };

  const selectionInfo = useSelection(
    document,
    setDocument,
    setDocumentAndMarkDirtyState
  );

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const addNewPage = () => {
    setDocumentAndMarkDirtyState(lastDocument =>
      produce(lastDocument, draft => {
        const newActiveIndex = draft.pages.length;
        draft.pages.push({
          id: uuidv4(),
          name: `Page ${newActiveIndex + 1}`,
          shapes: [],
        });
        draft.activePageIndex = newActiveIndex;
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

    setDocumentAndMarkDirtyState(lastDocument =>
      produce(lastDocument, draft => {
        const newPage = {
          id: uuidv4(),
          name: `${document.pages[pageIndex].name} - copy`,
          shapes: newShapes,
        };
        const newIndex = draft.activePageIndex + 1;
        draft.pages.splice(newIndex, 0, newPage);
        draft.activePageIndex = newIndex;
      })
    );
  };

  const deletePage = (pageIndex: number) => {
    const newActivePageId =
      pageIndex < document.pages.length - 1
        ? document.pages[pageIndex + 1].id // If it's not the last page, select the next one
        : document.pages[pageIndex - 1].id; // Otherwise, select the previous one

    setDocumentAndMarkDirtyState(lastDocument =>
      produce(lastDocument, draft => {
        draft.pages = draft.pages.filter(
          currentPage => document.pages[pageIndex].id !== currentPage.id
        );
      })
    );

    setActivePage(newActivePageId);
  };

  const getActivePage = () => {
    return document.pages[document.activePageIndex];
  };

  const getActivePageName = () => {
    return document.pages[document.activePageIndex].name;
  };

  const setActivePage = (pageId: string) => {
    selectionInfo.clearSelection();
    selectionInfo.shapeRefs.current = {};

    setDocumentAndMarkDirtyState(lastDocument =>
      produce(lastDocument, draft => {
        const pageIndex = draft.pages.findIndex(page => page.id === pageId);
        if (pageIndex !== -1) {
          draft.activePageIndex = pageIndex;
        }
      })
    );
  };

  const editPageTitle = (pageIndex: number, newName: string) => {
    setDocumentAndMarkDirtyState(lastDocument =>
      produce(lastDocument, draft => {
        draft.pages[pageIndex].name = newName;
      })
    );
  };

  const swapPages = (id1: string, id2: string) => {
    setDocumentAndMarkDirtyState(lastDocument =>
      produce(lastDocument, draft => {
        const index1 = draft.pages.findIndex(page => page.id === id1);
        const index2 = draft.pages.findIndex(page => page.id === id2);
        if (index1 !== -1 && index2 !== -1) {
          const temp = draft.pages[index1];
          draft.pages[index1] = draft.pages[index2];
          draft.pages[index2] = temp;
        }
      })
    );
  };

  const pasteShapes = (shapes: ShapeModel[]) => {
    loadSampleDocument && setLoadSampleDocument(false);
    const newShapes: ShapeModel[] = shapes.map(shape => {
      shape.id = uuidv4();
      return shape;
    });

    if (isPageIndexValid(document)) {
      setDocumentAndMarkDirtyState(lastDocument =>
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

  const [dropRef, setDropRef] = React.useState<
    React.MutableRefObject<HTMLDivElement | null>
  >(React.useRef<HTMLDivElement>(null));

  const { copyShapeToClipboard, pasteShapeFromClipboard, canCopy, canPaste } =
    useClipboard(
      pasteShapes,
      document.pages[document.activePageIndex].shapes,
      selectionInfo,
      dropRef
    );

  const createNewFullDocument = () => {
    setDocument(createDefaultDocumentModel());
    setCanvasSize(createDefaultCanvasSize());
    setDocumentAndMarkDirtyState(createDefaultDocumentModel(), false);
    setFileName('');

    // 🔹 Resetear el scroll de manera más precisa
    setTimeout(() => {
      requestAnimationFrame(() => {
        const canvasContainer = window.document.querySelector(
          "[data-drop-target-for-element='true']"
        ) as HTMLElement;
        if (canvasContainer) {
          console.log('✅ Reseteando scroll del canvas:', canvasContainer);

          // 🔹 Forzamos el scroll varias veces
          canvasContainer.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          setTimeout(() => canvasContainer.scrollTo(0, 0), 10);
          requestAnimationFrame(() => canvasContainer.scrollTo(0, 0));
        } else {
          console.log('⚠️ No se encontró el contenedor de scroll.');
        }
      });
    }, 200);
  };

  const deleteSelectedShapes = () => {
    if (isPageIndexValid(document)) {
      setDocumentAndMarkDirtyState(lastDocument =>
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
    loadSampleDocument && setLoadSampleDocument(false);
    if (!isPageIndexValid(document)) {
      return '';
    }

    const newShape = createShape({ x, y }, type, otherProps);

    setDocumentAndMarkDirtyState(lastDocument =>
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
      setDocumentAndMarkDirtyState(fullDocument => {
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
      setDocumentAndMarkDirtyState(fullDocument => {
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
    setDocumentAndMarkDirtyState(document, false);
    loadSampleDocument && setLoadSampleDocument(false);
    setDocument(document);
    setHowManyLoadedDocuments(numberOfDocuments => numberOfDocuments + 1);
    setCustomColors(document.customColors);
    setCanvasSize(document.size);
  };

  const [customColors, setCustomColors] = React.useState<(string | null)[]>(
    new Array(APP_CONSTANTS.COLOR_SLOTS).fill(null)
  );

  const updateColorSlot = (color: string, index: number) => {
    setCustomColors(prev => {
      const newColors = [...prev];
      newColors[index] = color;
      return newColors;
    });
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
        fullDocument: {
          ...document,
          customColors,
          size: canvasSize,
        },
        addNewPage,
        duplicatePage,
        getActivePage,
        getActivePageName,
        setActivePage,
        deletePage,
        editPageTitle,
        swapPages,
        activePageIndex: document.activePageIndex,
        isThumbnailContextMenuVisible,
        setIsThumbnailContextMenuVisible,
        howManyLoadedDocuments,
        canvasSize,
        setCanvasSize,
        customColors,
        updateColorSlot,
        dropRef,
        setDropRef,
        setIsDirty,
        loadSampleDocument,
        setLoadSampleDocument,
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
