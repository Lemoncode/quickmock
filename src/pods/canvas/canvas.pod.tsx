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

export const CanvasPod = () => {
  const [shapes, setShapes] = useState<ShapeModel[]>([
    createShape({ x: 10, y: 10 }, { width: 200, height: 50 }, 'combobox'),
    createShape({ x: 90, y: 170 }, { width: 250, height: 50 }, 'input'),
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

  const renderShapeComponent = (shape: ShapeModel) => {
    switch (shape.type) {
      case 'combobox':
        return (
          <ComboBoxShape
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            draggable
            onSelected={handleSelected}
            ref={shapeRefs.current[shape.id]}
            onDragEnd={handleDragEnd(shape.id)}
            onTransform={handleTransform}
            onTransformEnd={handleTransform}
          />
        );
      case 'input':
        return (
          <InputShape
            id={shape.id}
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            draggable
            onSelected={handleSelected}
            ref={shapeRefs.current[shape.id]}
            onDragEnd={handleDragEnd(shape.id)}
            onTransform={handleTransform}
            onTransformEnd={handleTransform}
          />
        );
      default:
        return <p>** Shape not defined **</p>;
    }
  };

  return (
    <div className={classes.canvas}>
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

              return renderShapeComponent(shape);
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
