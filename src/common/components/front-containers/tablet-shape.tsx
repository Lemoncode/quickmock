import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';

export const getTabletShapeSizeRestrictions = (): ShapeSizeRestrictions => ({
  minWidth: 200,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 400,
  defaultHeight: 300,
});

export const TabletShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const margin = 20;
    const screenMargin = 15;
    const cameraPadding = 3;
    const buttonPadding = 3;

    const cameraRadius = 3;
    const buttonRadius = 5;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'tablet')}
      >
        {/* Marco de la tablet */}
        <Rect
          x={margin}
          y={margin}
          width={width - 2 * margin}
          height={height - 2 * margin}
          cornerRadius={20}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Pantalla de la tablet */}
        <Rect
          x={margin + screenMargin}
          y={margin + screenMargin}
          width={width - 2 * margin - 2 * screenMargin}
          height={height - 2 * margin - 2 * screenMargin}
          cornerRadius={10}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />

        {/* Cámara frontal */}
        <Circle
          x={margin + cameraPadding + cameraRadius}
          y={height / 2}
          radius={cameraRadius}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />

        {/* Botón de inicio */}
        <Circle
          x={width - margin - buttonPadding - buttonRadius}
          y={height / 2}
          radius={buttonRadius}
          stroke="black"
          strokeWidth={1.5}
          shadowBlur={1}
          fill="white"
        />
      </Group>
    );
  }
);
