import { ShapeRefs } from '@/core/model';
import { useCanvasContext } from '@/core/providers';
import { renderShapeComponent } from '@/pods/canvas/shape-renderer';
import { calculateCanvasBounds } from '@/pods/toolbar/components/export-button/export-button.utils';
import { KonvaEventObject } from 'konva/lib/Node';
import { createRef, useRef } from 'react';
import { Layer, Stage } from 'react-konva';

interface Props {
  pageIndex: number;
  onSetActivePage: (pageId: string) => void;
}

export const ThumbPage: React.FunctionComponent<Props> = props => {
  const { pageIndex, onSetActivePage } = props;

  const { fullDocument } = useCanvasContext();

  const page = fullDocument.pages[pageIndex];
  const shapes = page.shapes;
  const fakeShapeRefs = useRef<ShapeRefs>({});

  const bounds = calculateCanvasBounds(shapes);

  const canvasSize = {
    width: bounds.x + bounds.width,
    height: bounds.y + bounds.height,
  };
  const scaleFactorX = 250 / canvasSize.width;
  const scaleFactorY = 180 / canvasSize.height;
  const finalScale = Math.min(scaleFactorX, scaleFactorY);

  return (
    <div
      style={{ width: '250px', height: '180px', border: '1px solid red' }}
      onClick={() => onSetActivePage(page.id)}
    >
      <Stage width={250} height={180} scaleX={finalScale} scaleY={finalScale}>
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
  );
};
