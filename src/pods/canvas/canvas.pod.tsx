import classes from './canvas.pod.module.css';
import { ComboBoxShape } from '@/common/components/front-components';
import { createRef, useState } from 'react';
import { Layer, Stage, Transformer } from 'react-konva';
import { ShapeModel, createShape } from './canvas.model';
import { useSelection } from './use-selection.hook';
import Konva from 'konva';
import { useTransform } from './use-transform.hook';
import {
  fitSizeToShapeSizeRestrictions,
  getShapeSizeRestrictions,
} from './canvas.util';
import { Box } from 'konva/lib/shapes/Transformer';
import { InputShape } from '@/common/components/front-components/input-shape';
import { renderShapeComponent } from './shape-renderer';
import {
  moveZIndexDownOneLevel,
  moveZIndexToBottom,
  moveZIndexTopOneLevel,
  moveZIndexToTop,
} from './zindex.util';

export const CanvasPod = () => {
  const [shapes, setShapes] = useState<ShapeModel[]>([
    createShape({ x: 10, y: 10 }, { width: 200, height: 50 }, 'combobox'),
    createShape({ x: 90, y: 170 }, { width: 250, height: 50 }, 'input'),
    createShape({ x: 90, y: 270 }, { width: 60, height: 35 }, 'toggleswitch'),
    createShape({ x: 220, y: 280 }, { width: 60, height: 25 }, 'toggleswitch'),
  ]);

  const {
    shapeRefs,
    transformerRef,
    handleSelected,
    handleClearSelection,
    selectedShapeRef,
    selectedShapeId,
    selectedShapeType,
  } = useSelection(shapes);

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

  return (
    <div className={classes.canvas}>
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
