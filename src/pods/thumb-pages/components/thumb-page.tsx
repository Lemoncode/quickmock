import { ShapeRefs } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { renderShapeComponent } from '@/pods/canvas/shape-renderer';
import { calculateCanvasBounds } from '@/pods/toolbar/components/export-button/export-button.utils';
import { KonvaEventObject } from 'konva/lib/Node';
import { createRef, useRef, useEffect, useState } from 'react';
import { Layer, Stage } from 'react-konva';
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

interface Props {
  pageIndex: number;
  onSetActivePage: (pageId: string) => void;
  setPageTitleBeingEdited: (index: number) => void;
}

export const ThumbPage: React.FunctionComponent<Props> = props => {
  const { pageIndex, onSetActivePage, setPageTitleBeingEdited } = props;
  const { fullDocument, swapPages } = useCanvasContext();
  const page = fullDocument.pages[pageIndex];
  const shapes = page.shapes;
  const fakeShapeRefs = useRef<ShapeRefs>({});

  const bounds = calculateCanvasBounds(shapes);
  const canvasSize = {
    width: bounds.x + bounds.width,
    height: bounds.y + bounds.height,
  };
  const scaleFactorX = 200 / canvasSize.width;
  const scaleFactorY = 180 / canvasSize.height;
  const finalScale = Math.min(scaleFactorX, scaleFactorY);

  const {
    showContextMenu,
    contextMenuRef,
    setShowContextMenu,
    handleShowContextMenu,
  } = useContextMenu();

  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
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
    const el = ref.current;
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
        className={classes.container}
        onClick={() => onSetActivePage(page.id)}
        onContextMenu={handleShowContextMenu}
        ref={ref}
        style={{
          opacity: dragging ? 0.4 : 1,
          background: isDraggedOver ? 'lightblue' : 'white',
        }}
      >
        <Stage width={200} height={180} scaleX={finalScale} scaleY={finalScale}>
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
