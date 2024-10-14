import { forwardRef, useMemo } from 'react';
import { Group, Line, Circle, Rect } from 'react-konva';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const LineChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 250,
  defaultHeight: 200,
};

const LINE_CHART_WIDTH = 350;
const LINE_CHART_HEIGHT = 250;

export const getLineChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  LineChartShapeSizeRestrictions;

const shapeType: ShapeType = 'linechart';

export const LineChartShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    LineChartShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const scaleX = useMemo(() => {
    return restrictedWidth / LINE_CHART_WIDTH;
  }, [restrictedWidth]);

  const scaleY = useMemo(() => {
    return restrictedHeight / LINE_CHART_HEIGHT;
  }, [restrictedHeight]);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Group
        width={LINE_CHART_WIDTH}
        height={LINE_CHART_HEIGHT}
        scaleX={scaleX}
        scaleY={scaleY}
      >
        {
          <Rect
            x={50}
            y={50}
            width={LINE_CHART_WIDTH - 50}
            height={LINE_CHART_HEIGHT - 50}
            fill="transparent"
          />
        }
        {/* Eje X */}
        <Line points={[50, 250, 350, 250]} stroke="black" strokeWidth={2} />

        {/* Eje Y */}
        <Line points={[50, 50, 50, 250]} stroke="black" strokeWidth={2} />

        {/* Interior graphics   */}

        {/* Línea 1 */}
        <Line
          points={[
            50, 200, 100, 150, 150, 180, 200, 100, 250, 130, 300, 80, 350, 120,
          ]}
          stroke="darkgray"
          strokeWidth={2}
        />
        {[
          { x: 50, y: 200 },
          { x: 100, y: 150 },
          { x: 150, y: 180 },
          { x: 200, y: 100 },
          { x: 250, y: 130 },
          { x: 300, y: 80 },
          { x: 350, y: 120 },
        ].map((point, index) => (
          <Circle key={index} x={point.x} y={point.y} radius={4} fill="black" />
        ))}

        {/* Línea 2 */}
        <Line
          points={[
            50, 220, 100, 170, 150, 190, 200, 130, 250, 160, 300, 110, 350, 140,
          ]}
          stroke="gray"
          strokeWidth={2}
        />
        {[
          { x: 50, y: 220 },
          { x: 100, y: 170 },
          { x: 150, y: 190 },
          { x: 200, y: 130 },
          { x: 250, y: 160 },
          { x: 300, y: 110 },
          { x: 350, y: 140 },
        ].map((point, index) => (
          <Circle key={index} x={point.x} y={point.y} radius={4} fill="black" />
        ))}

        {/* Línea 3 */}
        <Line
          points={[
            50, 240, 100, 190, 150, 210, 200, 160, 250, 190, 300, 140, 350, 170,
          ]}
          stroke="lightgray"
          strokeWidth={2}
        />
        {[
          { x: 50, y: 240 },
          { x: 100, y: 190 },
          { x: 150, y: 210 },
          { x: 200, y: 160 },
          { x: 250, y: 190 },
          { x: 300, y: 140 },
          { x: 350, y: 170 },
        ].map((point, index) => (
          <Circle key={index} x={point.x} y={point.y} radius={4} fill="black" />
        ))}
      </Group>
    </Group>
  );
});
