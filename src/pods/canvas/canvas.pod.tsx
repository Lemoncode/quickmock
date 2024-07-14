import classes from './canvas.pod.module.css';
import { createRef, useState } from 'react';
import { Layer, Stage, Transformer } from 'react-konva';
import { ShapeModel } from './canvas.model';
import { useSelection } from './use-selection.hook';
import Konva from 'konva';
import { useTransform } from './use-transform.hook';
import { renderShapeComponent } from './shape-renderer';
import { useDropShape } from './use-drop-shape.hook';
import { useMonitorShape } from './use-monitor-shape.hook';
import {
  moveZIndexDownOneLevel,
  moveZIndexToBottom,
  moveZIndexTopOneLevel,
  moveZIndexToTop,
} from './zindex.util';

export const CanvasPod = () => {
  const [shapes, setShapes] = useState<ShapeModel[]>([]);

  const {
    shapeRefs,
    transformerRef,
    handleSelected,
    handleClearSelection,
    selectedShapeRef,
    selectedShapeId,
    selectedShapeType,
  } = useSelection(shapes);

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
