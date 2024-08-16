import React, { forwardRef, useMemo } from 'react';
import { Group, Line, Circle, Rect } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const LineChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 100,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 200,
};

const PIE_FIX_WIDTH = 200;
const PIE_FIX_HEIGHT = 200;

export const getLineChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  LineChartShapeSizeRestrictions;

export const LineChartShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, data = [], id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        LineChartShapeSizeRestrictions,
        width,
        height
      );

    const scaleX = useMemo(() => {
      return restrictedWidth / PIE_FIX_WIDTH;
    }, [restrictedWidth]);

    const scaleY = useMemo(() => {
      return restrictedHeight / PIE_FIX_HEIGHT;
    }, [restrictedWidth]);

    const colors = ['darkgray', 'gray', 'lightgray'];

    // Definir los puntos de inicio y fin de los ejes X e Y
    const xAxisStart = { x: 50, y: 250 };
    const xAxisEnd = { x: 350, y: 250 };
    const yAxisStart = { x: 50, y: 50 };
    const yAxisEnd = { x: 50, y: 250 };

    // Calcular las dimensiones del rectángulo
    const rectX = yAxisStart.x;
    const rectY = yAxisStart.y;
    const rectWidth = xAxisEnd.x - xAxisStart.x;
    const rectHeight = yAxisEnd.y - yAxisStart.y;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'linechart')}
      >
        <Rect
          x={rectX}
          y={rectY}
          width={rectWidth}
          height={rectHeight}
          fill="transparent"
          onClick={() => onSelected(id, 'linechart')}
        />
        <Group
          width={PIE_FIX_WIDTH}
          height={PIE_FIX_HEIGHT}
          scaleX={scaleX}
          scaleY={scaleY}
        >
          {/* Eje X */}
          <Line points={[50, 250, 350, 250]} stroke="black" strokeWidth={2} />

          {/* Eje Y */}
          <Line points={[50, 50, 50, 250]} stroke="black" strokeWidth={2} />

          {/* Líneas y Puntos */}
          {data.map((lineData, lineIndex) => {
            const points = lineData.flatMap(point => [point.x, point.y]);

            return (
              <React.Fragment key={lineIndex}>
                <Line
                  points={points}
                  stroke={colors[lineIndex]}
                  strokeWidth={2}
                />
                {lineData.map((point, pointIndex) => (
                  <Circle
                    key={pointIndex}
                    x={point.x}
                    y={point.y}
                    radius={4}
                    fill="black"
                  />
                ))}
              </React.Fragment>
            );
          })}
        </Group>
      </Group>
    );
  }
);
