import { createRef, useMemo } from 'react';
import Konva from 'konva';
import { useCanvasContext } from '@/core/providers';
import { Layer, Line, Stage, Transformer } from 'react-konva';
import { useTransform } from './use-transform.hook';
import { renderShapeComponent } from './shape-renderer';
import { useDropShape } from './use-drop-shape.hook';
import { useMonitorShape } from './use-monitor-shape.hook';
import classes from './canvas.pod.module.css';
import { EditableComponent } from '@/common/components/inline-edit';
import { useSnapin } from './use-snap-in.hook';

export const CanvasPod = () => {
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

  const { isDraggedOver, dropRef } = useDropShape();
  const { stageRef } = useMonitorShape(dropRef, addNewShape);

  // TODO, wrap in useCallback for better performance
  const getSelectedShapeKonvaId = (): string => {
    let result: string = '';

    if (selectedShapeRef.current) {
      result = String(selectedShapeRef.current._id);
    }

    return result;
  };

  // TODO. wrap in useMemo
  const selectedShapeKonvaId = getSelectedShapeKonvaId();

  const {
    handleDragMove,
    showSnapInHorizontalLine,
    showSnapInVerticalLine,
    yCoordHorizontalLine,
    xCoordVerticalLine,
  } = useSnapin(stageRef, transformerRef, selectedShapeKonvaId);

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
            onDragMove={handleDragMove}
          />
          {showSnapInHorizontalLine && (
            <Line
              points={[
                0,
                yCoordHorizontalLine,
                stageRef.current?.width() ?? 0,
                yCoordHorizontalLine,
              ]}
              stroke="red"
              strokeWidth={1}
            />
          )}
          {showSnapInVerticalLine && (
            <Line
              points={[
                xCoordVerticalLine,
                0,
                xCoordVerticalLine,
                stageRef.current?.height() ?? 0,
              ]}
              stroke="red"
              strokeWidth={1}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};
