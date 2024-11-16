import { ShapeRefs, Size } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { renderShapeComponent } from '@/pods/canvas/shape-renderer';
import { KonvaEventObject } from 'konva/lib/Node';
import { createRef, useRef } from 'react';
import { Layer, Stage } from 'react-konva';
import { calculateScaleBasedOnBounds } from './thumb-page.business';
import { ThumbPageContextMenu } from './context-menu';
import { useContextMenu } from '../use-context-menu-thumb.hook';
import { CaretDown } from '@/common/components/icons';
import classes from './thumb-page.module.css';
import React from 'react';

interface Props {
  pageIndex: number;
  onSetActivePage: (pageId: string) => void;
  setPageTitleBeingEdited: (index: number) => void;
}

export const ThumbPage: React.FunctionComponent<Props> = props => {
  const { pageIndex, onSetActivePage, setPageTitleBeingEdited } = props;
  const { fullDocument } = useCanvasContext();
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

  React.useEffect(() => {
    const newCanvaSize = {
      width: divRef.current?.clientWidth || 1,
      height: divRef.current?.clientHeight || 1,
    };

    window.addEventListener('resize', () => {
      setCanvasSize({
        width: divRef.current?.clientWidth || 1,
        height: divRef.current?.clientHeight || 1,
      });
    });

    setCanvasSize(newCanvaSize);
    setFinalScale(calculateScaleBasedOnBounds(shapes, newCanvaSize));

    setKey(key => key + 1);

    return () => {
      window.removeEventListener('resize', () => {
        setCanvasSize({
          width: divRef.current?.clientWidth || 1,
          height: divRef.current?.clientHeight || 1,
        });
      });
    };
  }, [divRef.current, shapes]);

  const {
    showContextMenu,
    contextMenuRef,
    setShowContextMenu,
    handleShowContextMenu,
  } = useContextMenu();

  return (
    <>
      <div
        ref={divRef}
        className={classes.container}
        onClick={() => onSetActivePage(page.id)}
        onContextMenu={handleShowContextMenu}
        key={key}
      >
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
