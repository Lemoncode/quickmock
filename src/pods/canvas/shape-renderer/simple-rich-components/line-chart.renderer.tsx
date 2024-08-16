import { LineChartShape } from '@/common/components/front-rich-components';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderLineChart = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  // Data
  const lineChartData = [
    [
      { x: 50, y: 200 },
      { x: 100, y: 150 },
      { x: 150, y: 180 },
      { x: 200, y: 100 },
      { x: 250, y: 130 },
      { x: 300, y: 80 },
      { x: 350, y: 120 },
    ],
    [
      { x: 50, y: 220 },
      { x: 100, y: 170 },
      { x: 150, y: 190 },
      { x: 200, y: 130 },
      { x: 250, y: 160 },
      { x: 300, y: 110 },
      { x: 350, y: 140 },
    ],
    [
      { x: 50, y: 240 },
      { x: 100, y: 190 },
      { x: 150, y: 210 },
      { x: 200, y: 160 },
      { x: 250, y: 190 },
      { x: 300, y: 140 },
      { x: 350, y: 170 },
    ],
  ];

  return (
    <LineChartShape
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      name="shape"
      width={shape.width}
      height={shape.height}
      draggable
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      data={lineChartData}
    />
  );
};
