import classes from './canvas.pod.module.css';
import { ComboBoxShape } from '@/common/components/front-components';
import { createRef, useState } from 'react';
import { Layer, Stage, Transformer } from 'react-konva';
import { ShapeModel, createShape } from './canvas.model';
import { useSelection } from './use-selection.hook';
import Konva from 'konva';

export const CanvasPod = () => {
  const [shapes, setShapes] = useState<ShapeModel[]>([
    createShape(10, 10, 200, 50),
    createShape(90, 170, 250, 50),
  ]);

  const { shapeRefs, transformerRef, handleSelected, handleClearSelection } =
    useSelection(shapes);

  const handleDragEnd =
    (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
      const { x, y } = e.target.position();
      setShapes(prevShapes =>
        prevShapes.map(shape => (shape.id === id ? { ...shape, x, y } : shape))
      );
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
                />
              );
            })
          }
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
    </div>
  );
};
