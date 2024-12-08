import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { OtherProps, ShapeModel, ShapeRefs, ShapeType } from '@/core/model';
import { DocumentModel, SelectionInfo, ZIndexAction } from './canvas.model';
import { performZIndexAction } from './zindex.util';
import { getActivePageShapes, isPageIndexValid } from './canvas.business';
import { produce } from 'immer';

export const useSelection = (
  document: DocumentModel,
  setDocument: React.Dispatch<React.SetStateAction<DocumentModel>>
): SelectionInfo => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRefs = useRef<ShapeRefs>({});
  const selectedShapesRefs = useRef<Konva.Node[]>([]);
  const [selectedShapesIds, setSelectedShapesIds] = useState<string[]>([]);
  const [selectedShapeType, setSelectedShapeType] = useState<ShapeType | null>(
    null
  );

  const removeShapesNotInDocument = (currentIds: string[]) => {
    // Cleanup Refs, let's get the list of shape and if there are any
    // shapeRef that is not in the data Ref let's remove (just performance wise)
    Object.keys(shapeRefs.current).forEach(id => {
      if (!currentIds.includes(id)) {
        delete shapeRefs.current[id];
      }
    });
  };

  // Remove unused shapes and reset selectedShapeId if it no longer exists
  useEffect(() => {
    if (!isPageIndexValid(document)) {
      return;
    }

    const shapes = getActivePageShapes(document);
    const currentIds = shapes.map(shape => shape.id);

    // 1. First cleanup Refs, let's get the list of shape and if there are any
    //    shapeRef that is not in the data Ref let's remove (just performance wise)
    removeShapesNotInDocument(currentIds);

    // 2. Now we've got a list of selected shape, let's ensure that at least one of them
    // exists, if not let's wipe the list selection
    //
    // Why only one? Because usually we select a group of shapes, if we keep the selection
    // we can whether remove all, or keep all, if we click outside the selection it should
    // wipe the whole colletion
    if (selectedShapesIds.length > 0) {
      const exists = selectedShapesIds.some(id => currentIds.includes(id));
      if (!exists) {
        transformerRef.current?.nodes([]);
        selectedShapesRefs.current = [];
        setSelectedShapesIds([]);
        setSelectedShapeType(null);
      }
    }
  }, [document.pages, selectedShapesIds]);

  const isDeselectSingleItem = (arrayIds: string[]) => {
    return (
      arrayIds.length === 1 &&
      selectedShapesRefs.current.find(
        item => item.attrs['data-id'].toString() === arrayIds[0]
      ) !== undefined
    );
  };

  const deselectSingleItemOnMultipleSelection = (
    formerShapeIds: string[],
    unselectId: string
  ) => {
    if (selectedShapesRefs.current) {
      const trimmedShapeIds = formerShapeIds.filter(id => id !== unselectId);

      selectedShapesRefs.current = trimmedShapeIds.map(
        id => shapeRefs.current[id].current
      );

      setSelectedShapesIds(trimmedShapeIds);
    }
  };

  const handleSelected = (
    ids: string[] | string,
    type: ShapeType,
    isUserDoingMultipleSelection: boolean
  ) => {
    // When chaging active pages, the refs are not yet updated
    // check if this is something temporary or final solution
    if (Object.keys(shapeRefs.current).length === 0) {
      return;
    }

    // I want to know if the ids is string or array
    const arrayIds = typeof ids === 'string' ? [ids] : ids;

    if (!isUserDoingMultipleSelection) {
      // No multiple selection, just replace selection with current selected item(s)
      selectedShapesRefs.current = arrayIds.map(
        id => shapeRefs.current[id].current
      );
      setSelectedShapesIds(arrayIds);
    } else {
      if (isDeselectSingleItem(arrayIds)) {
        deselectSingleItemOnMultipleSelection(selectedShapesIds, arrayIds[0]);
      } else {
        // Multiple selection, just push what is selected to the current selection
        selectedShapesRefs.current = selectedShapesRefs.current.concat(
          arrayIds.map(id => shapeRefs.current[id].current)
        );

        setSelectedShapesIds(formerShapeIds => [
          ...formerShapeIds,
          ...arrayIds,
        ]);
      }
    }

    transformerRef?.current?.nodes(selectedShapesRefs.current);

    //transformerRef?.current?.nodes([shapeRefs.current[id].current]);
    // Todo set type only if single selection
    setSelectedShapeType(type);
  };

  const clearSelection = () => {
    transformerRef.current?.nodes([]);
    selectedShapesRefs.current = [];
    setSelectedShapesIds([]);
    setSelectedShapeType(null);
  };

  const handleClearSelection = (
    mouseEvent?:
      | Konva.KonvaEventObject<MouseEvent>
      | Konva.KonvaEventObject<TouchEvent>
  ) => {
    if (!mouseEvent || mouseEvent.target === mouseEvent.target.getStage()) {
      clearSelection();
    }
  };

  const setZIndexOnSelected = (action: ZIndexAction) => {
    if (!isPageIndexValid(document)) return;

    setDocument(prevDocument =>
      produce(prevDocument, draft => {
        draft.pages[prevDocument.activePageIndex].shapes = performZIndexAction(
          selectedShapesIds,
          action,
          getActivePageShapes(prevDocument)
        );
      })
    );
  };

  const updateTextOnSelected = (text: string) => {
    if (!isPageIndexValid(document)) return;

    // Only when selection is one
    if (selectedShapesIds.length !== 1) {
      return;
    }

    const selectedShapeId = selectedShapesIds[0];
    setDocument(prevDocument =>
      produce(prevDocument, draft => {
        draft.pages[prevDocument.activePageIndex].shapes = draft.pages[
          prevDocument.activePageIndex
        ].shapes.map(shape =>
          shape.id === selectedShapeId ? { ...shape, text } : shape
        );
      })
    );
  };

  const updateOtherPropsOnSelectedSingleShape = <K extends keyof OtherProps>(
    selectedShapeId: string,
    key: K,
    value: OtherProps[K]
  ) => {
    setDocument(prevDocument =>
      produce(prevDocument, draft => {
        draft.pages[prevDocument.activePageIndex].shapes = draft.pages[
          prevDocument.activePageIndex
        ].shapes.map(shape =>
          shape.id === selectedShapeId
            ? { ...shape, otherProps: { ...shape.otherProps, [key]: value } }
            : shape
        );
      })
    );
  };

  const updateOtherPropsOnSelected = <K extends keyof OtherProps>(
    key: K,
    value: OtherProps[K],
    multipleSelection: boolean = false
  ) => {
    if (!isPageIndexValid(document) || selectedShapesIds.length === 0) return;

    // TODO: Right now applying this only to single selection
    // in the future we could apply to all selected shapes
    // BUT, we have to show only common shapes (pain in the neck)
    // Only when selection is one
    if (selectedShapesIds.length === 1) {
      const selectedShapeId = selectedShapesIds[0];
      updateOtherPropsOnSelectedSingleShape(selectedShapeId, key, value);

      return;
    }

    if (multipleSelection) {
      setDocument(prevDocument =>
        produce(prevDocument, draft => {
          draft.pages[prevDocument.activePageIndex].shapes = draft.pages[
            prevDocument.activePageIndex
          ].shapes.map(shape =>
            selectedShapesIds.includes(shape.id)
              ? {
                  ...shape,
                  otherProps: { ...shape.otherProps, [key]: value },
                }
              : shape
          );
        })
      );
    }
  };

  // Added index, right now we got multiple selection
  // if not returning just 0 (first element)
  const getSelectedShapeData = (index: number = 0): ShapeModel | undefined => {
    // If there is one selected will return that item
    // If there are multiple selected will return the first
    // In case no selection will return undefined
    if (index === undefined || selectedShapesIds.length === 0) {
      return;
    }

    const selectedShapeId = selectedShapesIds[index];

    const activeShape = getActivePageShapes(document).find(
      shape => shape.id === selectedShapeId
    );

    console.log('Active Shape', activeShape);

    return activeShape;
  };

  const getAllSelectedShapesData = (): ShapeModel[] => {
    return getActivePageShapes(document).filter(shape =>
      selectedShapesIds.includes(shape.id)
    );
  };

  return {
    transformerRef,
    shapeRefs,
    handleSelected,
    handleClearSelection,
    clearSelection,
    selectedShapesRefs,
    selectedShapesIds,
    selectedShapeType,
    getSelectedShapeData,
    getAllSelectedShapesData,
    setZIndexOnSelected,
    updateTextOnSelected,
    updateOtherPropsOnSelected,
  };
};
