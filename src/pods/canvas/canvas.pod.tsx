import classes from './canvas.pod.module.css';
import { createRef, useEffect, useRef, useState } from 'react';
import { Layer, Stage, Transformer } from 'react-konva';
import { ShapeModel, createShape } from './canvas.model';
import { useSelection } from './use-selection.hook';
import Konva from 'konva';
import { useTransform } from './use-transform.hook';
import { renderShapeComponent } from './shape-renderer';
import {
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import {
  convertFromDivElementCoordsToKonvaCoords,
  extractScreenCoordinatesFromPragmaticLocation,
  portScreenPositionToDivCoordinates,
} from './canvas.util';

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

  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const dropRef = useRef(null);
  const stageRef = useRef<Konva.Stage>(null);

  useEffect(() => {
    const el = dropRef.current;

    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({ destination: 'canvas' }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  });

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        invariant(destination);

        const type = source.data.type;
        const screenPosition =
          extractScreenCoordinatesFromPragmaticLocation(location);

        let positionX = 0;
        let positionY = 0;
        if (screenPosition) {
          invariant(dropRef.current);
          const { x: divRelativeX, y: divRelativeY } =
            portScreenPositionToDivCoordinates(
              dropRef.current as HTMLDivElement,
              screenPosition
            );

          invariant(stageRef.current);
          const stage = stageRef.current;
          const konvaCoord = convertFromDivElementCoordsToKonvaCoords(
            stage,
            screenPosition,
            {
              x: divRelativeX,
              y: divRelativeY,
            }
          );

          positionX = konvaCoord.x;
          positionY = konvaCoord.y;
        }

        setShapes(shapes => [
          ...shapes,
          createShape(
            { x: positionX, y: positionY },
            { width: 200, height: 50 }, // TODO: each shape should provide it's own size
            type as any
          ),
        ]);
      },
    });
  }, []);

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
