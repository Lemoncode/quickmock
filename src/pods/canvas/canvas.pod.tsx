import { createRef, useMemo, useEffect, useState } from 'react';
import Konva from 'konva';
import { useCanvasContext } from '@/core/providers';
import { Layer, Line, Stage, Transformer } from 'react-konva';
import { useTransform } from './use-transform.hook';
import { renderShapeComponent } from './shape-renderer';
import { useDropShape } from './use-drop-shape.hook';
import { useMonitorShape } from './use-monitor-shape.hook';
import classes from './canvas.pod.module.css';
import { EditableComponent } from '@/common/components/inline-edit';
import { useClipboard } from './use-clipboard.hook';
import { useSnapIn } from './use-snapin.hook';
import { ShapeType } from '@/core/model';

export const CanvasPod = () => {
  const [isTransfomerBeingDragged, setIsTransfomerBeingDragged] =
    useState(false);

  const {
    shapes,
    scale,
    selectionInfo,
    addNewShape,
    updateShapeSizeAndPosition,
    updateShapePosition,
  } = useCanvasContext();

  const {
    shapeRefs,
    transformerRef,
    handleSelected,
    handleClearSelection,
    selectedShapeRef,
    selectedShapeId,
    selectedShapeType,
    updateTextOnSelected,
  } = selectionInfo;

  const addNewShapeAndSetSelected = (type: ShapeType, x: number, y: number) => {
    const shapeId = addNewShape(type, x, y);
    // TODO add issue enhance this
    setTimeout(() => {
      handleSelected(shapeId, type);
    });
  };

  const { isDraggedOver, dropRef } = useDropShape();
  const { stageRef } = useMonitorShape(dropRef, addNewShapeAndSetSelected);

  const getSelectedShapeKonvaId = (): string => {
    let result = '';

    if (selectedShapeRef.current) {
      result = String(selectedShapeRef.current._id);
    }

    return result;
  };

  const selectedShapeKonvaId = useMemo(
    () => getSelectedShapeKonvaId(),
    [selectedShapeRef.current]
  );

  const {
    handleTransformerDragMove,
    showSnapInHorizontalLine,
    showSnapInVerticalLine,
    yCoordHorizontalLine,
    xCoordVerticalLine,
  } = useSnapIn(stageRef, transformerRef, selectedShapeKonvaId);

  const { handleTransform, handleTransformerBoundBoxFunc } = useTransform(
    updateShapeSizeAndPosition,
    {
      selectedShapeRef,
      selectedShapeId,
      selectedShapeType,
    }
  );

  const handleDragEnd =
    (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
      const { x, y } = e.target.position();
      updateShapePosition(id, { x, y });
    };

  const { copyShape, pasteShapeFromClipboard } = useClipboard();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmdPressed = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmdPressed && e.key === 'c') {
        copyShape();
      }
      if (isCtrlOrCmdPressed && e.key === 'v') {
        pasteShapeFromClipboard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedShapeId]);

  useEffect(() => {
    transformerRef.current?.nodes([]);
    selectedShapeRef.current = null;
  }, [shapes]);

  {
    /* TODO: add other animation for isDraggerOver */
  }
  return (
    <div
      className={classes.canvas}
      ref={dropRef}
      style={{ opacity: isDraggedOver ? 0.5 : 1 }}
    >
      {/*TODO: move size to canvas provider?*/}
      <Stage
        width={3000}
        height={3000}
        onMouseDown={handleClearSelection}
        onTouchStart={handleClearSelection}
        ref={stageRef}
        scale={{ x: scale, y: scale }}
      >
        <Layer>
          {
            /* TODO compentize and simplify this */
            shapes.map(shape => {
              if (!shapeRefs.current[shape.id]) {
                shapeRefs.current[shape.id] = createRef();
              }

              return (
                <EditableComponent
                  key={shape.id}
                  coords={{ x: shape.x, y: shape.y }}
                  size={{ width: shape.width, height: shape.height }}
                  isEditable={shape.allowsInlineEdition}
                  text={shape.text ?? ''}
                  onTextSubmit={updateTextOnSelected}
                  scale={scale}
                  editType="input"
                >
                  {renderShapeComponent(shape, {
                    handleSelected,
                    shapeRefs,
                    handleDragEnd,
                    handleTransform,
                  })}
                </EditableComponent>
              );
            })
          }
          <Transformer
            ref={transformerRef}
            flipEnabled={false}
            boundBoxFunc={handleTransformerBoundBoxFunc}
            onDragStart={() => setIsTransfomerBeingDragged(true)}
            onDragMove={handleTransformerDragMove}
            onDragEnd={() => setIsTransfomerBeingDragged(false)}
          />
          {isTransfomerBeingDragged && showSnapInHorizontalLine && (
            <Line
              points={[
                0,
                yCoordHorizontalLine,
                stageRef.current?.width() ?? 0,
                yCoordHorizontalLine,
              ]}
              stroke="rgb(0,161,255"
              dash={[4, 6]}
              strokeWidth={1}
            />
          )}
          {isTransfomerBeingDragged && showSnapInVerticalLine && (
            <Line
              points={[
                xCoordVerticalLine,
                0,
                xCoordVerticalLine,
                stageRef.current?.height() ?? 0,
              ]}
              stroke="rgb(0,161,255"
              dash={[4, 6]}
              strokeWidth={1}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};
