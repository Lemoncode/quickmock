import { createRef } from 'react';
import Konva from 'konva';
import { useCanvasContext } from '@/core/providers';
import { Layer, Stage, Transformer } from 'react-konva';
import { useTransform } from './use-transform.hook';
import { renderShapeComponent } from './shape-renderer';
import { useDropShape } from './use-drop-shape.hook';
import { useMonitorShape } from './use-monitor-shape.hook';
import classes from './canvas.pod.module.css';
import {
  moveZIndexDownOneLevel,
  moveZIndexToBottom,
  moveZIndexTopOneLevel,
  moveZIndexToTop,
} from './zindex.util';
import { ShapeModel } from '@/core/model';

export const CanvasPod = () => {
  const { shapes, setShapes, scale, selectionInfo } = useCanvasContext();

  const {
    shapeRefs,
    transformerRef,
    handleSelected,
    handleClearSelection,
    selectedShapeRef,
    selectedShapeId,
    selectedShapeType,
  } = selectionInfo;

  const { isDraggedOver, dropRef } = useDropShape();
  const { stageRef } = useMonitorShape(dropRef, setShapes);

  const { handleTransform, handleTransformerBoundBoxFunc } = useTransform(
    setShapes,
    {
      selectedShapeRef,
      selectedShapeId,
      selectedShapeType,
    }
  );

  const handleDragEnd =
    (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
      const { x, y } = e.target.position();
      setShapes(prevShapes =>
        prevShapes.map(shape => (shape.id === id ? { ...shape, x, y } : shape))
      );
    };

  const handleZIndexChange = (shapeCollection: ShapeModel[]) => {
    setShapes(shapeCollection);
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
      {/*TODO: move buttons to app props panel*/}
      <button
        onClick={() =>
          handleZIndexChange(moveZIndexToBottom(selectedShapeId, shapes))
        }
      >
        Move to Bottom
      </button>
      <button
        onClick={() =>
          handleZIndexChange(moveZIndexToTop(selectedShapeId, shapes))
        }
      >
        Move to Top
      </button>
      <button
        onClick={() =>
          handleZIndexChange(moveZIndexDownOneLevel(selectedShapeId, shapes))
        }
      >
        Move to Bottom One Level
      </button>
      <button
        onClick={() =>
          handleZIndexChange(moveZIndexTopOneLevel(selectedShapeId, shapes))
        }
      >
        Move to Top One Level
      </button>

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

              return renderShapeComponent(shape, {
                handleSelected,
                shapeRefs,
                handleDragEnd,
                handleTransform,
              });
            })
          }
          <Transformer
            ref={transformerRef}
            flipEnabled={false}
            boundBoxFunc={handleTransformerBoundBoxFunc}
          />
        </Layer>
      </Stage>
    </div>
  );
};
