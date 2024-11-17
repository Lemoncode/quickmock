import { ShapeRefs, Size } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { renderShapeComponent } from '@/pods/canvas/shape-renderer';
import { KonvaEventObject } from 'konva/lib/Node';
import { createRef, useRef, useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import { calculateScaleBasedOnBounds } from './thumb-page.business';
import { ThumbPageContextMenu } from './context-menu';
import { useContextMenu } from '../use-context-menu-thumb.hook';
import { CaretDown } from '@/common/components/icons';
import classes from './thumb-page.module.css';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import React from 'react';

interface Props {
  pageIndex: number;
  isVisible: boolean;
  onSetActivePage: (pageId: string) => void;
  setPageTitleBeingEdited: (index: number) => void;
}

export const ThumbPage: React.FunctionComponent<Props> = props => {
  const { fullDocument, swapPages, activePageIndex } = useCanvasContext();
  const { pageIndex, onSetActivePage, setPageTitleBeingEdited, isVisible } =
    props;
  const page = fullDocument.pages[pageIndex];
  const shapes = page.shapes;
  const fakeShapeRefs = useRef<ShapeRefs>({});

  const [finalScale, setFinalScale] = React.useState<number>(1);
  const [canvasSize, setCanvasSize] = React.useState<Size>({
    width: 1,
    height: 1,
  });

  const divRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = React.useState(0);

  const handleResizeAndForceRedraw = () => {
    const newCanvaSize = {
      width: divRef.current?.clientWidth || 1,
      height: divRef.current?.clientHeight || 1,
    };

    setCanvasSize(newCanvaSize);
    setFinalScale(calculateScaleBasedOnBounds(shapes, newCanvaSize));
    setTimeout(() => {
      setKey(key => key + 1);
    }, 100);
  };

  React.useLayoutEffect(() => {
    handleResizeAndForceRedraw();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;
    handleResizeAndForceRedraw();
  }, [isVisible]);

  React.useEffect(() => {
    setTimeout(() => {
      handleResizeAndForceRedraw();
    }, 100);
  }, [shapes, activePageIndex]);

  React.useEffect(() => {
    window.addEventListener('resize', handleResizeAndForceRedraw);

    return () => {
      window.removeEventListener('resize', handleResizeAndForceRedraw);
    };
  }, [divRef.current]);

  const {
    showContextMenu,
    contextMenuRef,
    setShowContextMenu,
    handleShowContextMenu,
  } = useContextMenu();

  const [dragging, setDragging] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = divRef.current;
    invariant(el);
    return draggable({
      element: el,
      getInitialData: () => ({
        pageIndex: fullDocument.pages[pageIndex].id,
        type: 'thumbPage',
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [pageIndex, fullDocument.pages]);

  useEffect(() => {
    const el = divRef.current;
    invariant(el);

    return dropTargetForElements({
      element: el,
      getData: () => ({
        pageIndex: fullDocument.pages[pageIndex].id,
        type: 'thumbPage',
      }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [pageIndex, fullDocument.pages]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        if (destination.data.type === 'thumbPage') {
          console.log(
            'Swapping pages:',
            source.data.pageIndex,
            destination.data.pageIndex
          );
          swapPages(
            String(source.data.pageIndex),
            String(destination.data.pageIndex)
          );
        }
      },
    });
  }, [swapPages, fullDocument.pages]);

  useEffect(() => {
    console.log('Updated pages:', fullDocument.pages);
  }, [fullDocument.pages]);

  return (
    <>
      <div
        ref={divRef}
        className={classes.container}
        onClick={() => onSetActivePage(page.id)}
        onContextMenu={handleShowContextMenu}
        style={{
          opacity: dragging ? 0.4 : 1,
          background: isDraggedOver ? 'lightblue' : 'white',
        }}
        key={key}
      >
        <div className={classes.noclick}>
          <Stage
            width={canvasSize.width}
            height={canvasSize.height}
            scaleX={finalScale}
            scaleY={finalScale}
          >
            <Layer>
              {shapes.map(shape => {
                if (!fakeShapeRefs.current[shape.id]) {
                  fakeShapeRefs.current[shape.id] = createRef();
                }
                return renderShapeComponent(shape, {
                  handleSelected: () => {},
                  shapeRefs: fakeShapeRefs,
                  handleDragEnd:
                    (_: string) => (_: KonvaEventObject<DragEvent>) => {},
                  handleTransform: () => {},
                });
              })}
            </Layer>
          </Stage>
        </div>
        <span
          onClick={handleShowContextMenu}
          className={classes['icon-container']}
        >
          <CaretDown />
        </span>

        {showContextMenu && (
          <ThumbPageContextMenu
            contextMenuRef={contextMenuRef}
            setShowContextMenu={setShowContextMenu}
            pageIndex={pageIndex}
            setPageTitleBeingEdited={setPageTitleBeingEdited}
          />
        )}
      </div>
    </>
  );
};
