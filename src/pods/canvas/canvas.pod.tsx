import React, { createRef, useEffect, useMemo, useRef, useState } from 'react';
import Konva from 'konva';
import { useCanvasContext } from '@/core/providers';
import { Layer, Line, Rect, Stage, Transformer } from 'react-konva';
import { useTransform } from './use-transform.hook';
import { renderShapeComponent } from './shape-renderer';
import { useDropShape } from './use-drop-shape.hook';
import { useMonitorShape } from './use-monitor-shape.hook';
import classes from './canvas.pod.module.css';
import { EditableComponent } from '@/common/components/inline-edit';
import { useSnapIn } from './use-snapin.hook';
import { ShapeType } from '@/core/model';
import { ENV } from '@/core/constants';
import { useDropImageFromDesktop } from './use-drop-image-from-desktop';
import { useKeyboardDisplacement } from './use-keyboard-displacement';
import { useMultipleSelectionShapeHook } from './use-multiple-selection-shape.hook';
import { ContextMenu } from '../context-menu/use-context-menu.hook';
import { CanvasGridLayer } from './canvas.grid';

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
    stageRef,
    canvasSize,
  } = useCanvasContext();

  const {
    shapeRefs,
    transformerRef,
    handleSelected,
    handleClearSelection,
    selectedShapesRefs,
    updateTextOnSelected,
    updateOtherPropsOnSelected,
  } = selectionInfo;

  const addNewShapeAndSetSelected = (type: ShapeType, x: number, y: number) => {
    const shapeId = addNewShape(type, x, y);
    // TODO add issue enhance this
    setTimeout(() => {
      handleSelected([shapeId], type, false);
    });
  };

  const { isDraggedOver, dropRef } = useDropShape();
  useMonitorShape(dropRef, addNewShapeAndSetSelected);

  const getSelectedShapeKonvaId = (): string[] => {
    let result: string[] = [];

    if (selectedShapesRefs.current) {
      result = selectedShapesRefs.current.map(item => String(item._id));
      //result = String(selectedShapesRefs.current._id);
    }

    return result;
  };

  const selectedShapesKonvaId = useMemo(
    () => getSelectedShapeKonvaId(),
    [selectedShapesRefs.current]
  );

  const {
    handleTransformerDragMove,
    showSnapInHorizontalLine,
    showSnapInVerticalLine,
    yCoordHorizontalLine,
    xCoordVerticalLine,
  } = useSnapIn(transformerRef, selectedShapesKonvaId);

  const { handleTransform, handleTransformerBoundBoxFunc } = useTransform(
    updateShapeSizeAndPosition
  );

  const { selectionRect, handleMouseDown, handleMouseMove, handleMouseUp } =
    useMultipleSelectionShapeHook(
      selectionInfo,
      {
        stageRef,
        transformerRef,
        shapeRefs,
      },
      shapes
    );

  // Note here: Limitation, Pragmatic Drag and Drop has any on the DropRef
  // but we need to cast it to HTMLDivElement
  const { handleDragOver, handleDropImage } = useDropImageFromDesktop(
    dropRef as unknown as React.MutableRefObject<HTMLDivElement>
  );

  const handleDragEnd =
    (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => {
      const { x, y } = e.target.position();
      updateShapePosition(id, { x, y });
    };

  useKeyboardDisplacement();

  const layerRef = useRef<Konva.Layer>(null);
  if (typeof window !== 'undefined' && ENV.IS_TEST_ENV && layerRef.current) {
    window.__TESTING_KONVA_LAYER__ = layerRef.current;
  }

  // We need this trick, if the user plays hard with the transfoermer,
  // resizing quite fast it mabe get out of sync wit the shape
  // so once the transformer ends, we reassign the nodes to the transformer
  // and redraw the layer
  useEffect(() => {
    const transformer = transformerRef.current;
    if (!transformer) return;

    const handleTransformEnd = () => {
      const selectedShapes = selectedShapesRefs.current;
      if (isTransfomerBeingDragged || !transformer) return;

      if (selectedShapes && selectedShapes.length === 1) {
        transformer.nodes([]);
        transformer.getLayer()?.batchDraw();
        setTimeout(() => {
          transformer.nodes(selectedShapes); // Vuelve a asignar los nodos
          transformer.getLayer()?.batchDraw(); // Redibuja la capa nuevamente
        }, 0);
      }
    };

    transformer.on('transformend', handleTransformEnd);

    return () => {
      transformer.off('transformend', handleTransformEnd);
    };
  }, [transformerRef.current]);

  {
    /* TODO: add other animation for isDraggerOver */
  }
  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDropImage}
      className={classes.canvas}
      ref={dropRef}
      style={{ opacity: isDraggedOver ? 0.5 : 1 }}
    >
      <ContextMenu dropRef={dropRef} />
      {/*         onMouseDown={handleClearSelection}*/}
      <Stage
        width={canvasSize.width}
        height={canvasSize.height}
        onTouchStart={handleClearSelection}
        ref={stageRef}
        scale={{ x: scale, y: scale }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        id="konva-stage" // data-id did not work for some reason
      >
        <CanvasGridLayer canvasSize={canvasSize} />
        <Layer ref={layerRef}>
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
                  onImageSrcSubmit={srcData =>
                    updateOtherPropsOnSelected('imageSrc', srcData)
                  }
                  scale={scale}
                  editType={shape.editType ?? 'input'}
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
          {/*Selection Rect*/}
          <Rect
            x={selectionRect.x}
            y={selectionRect.y}
            width={selectionRect.width}
            height={selectionRect.height}
            fill="rgba(0, 161, 255, 0.5)"
            visible={selectionRect.visible}
            stroke="blue"
            strokeWidth={1}
          />
        </Layer>
      </Stage>
    </div>
  );
};
