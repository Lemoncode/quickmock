import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const tabletShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 400,
  defaultHeight: 300,
};

export const getTabletShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabletShapeSizeRestrictions;

export const TabletShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        tabletShapeSizeRestrictions,
        width,
        height
      );
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
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'tablet')}
      >
        {/* Marco de la tablet */}
        <Rect
          x={margin}
          y={margin}
          width={restrictedWidth - 2 * margin}
          height={restrictedHeight - 2 * margin}
          cornerRadius={20}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Pantalla de la tablet */}
        <Rect
          x={margin + screenMargin}
          y={margin + screenMargin}
          width={restrictedWidth - 2 * margin - 2 * screenMargin}
          height={restrictedHeight - 2 * margin - 2 * screenMargin}
          cornerRadius={10}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />

        {/* Cámara frontal */}
        <Circle
          x={margin + cameraPadding + cameraRadius}
          y={restrictedHeight / 2}
          radius={cameraRadius}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />

        {/* Botón de inicio */}
        <Circle
          x={restrictedWidth - margin - buttonPadding - buttonRadius}
          y={restrictedHeight / 2}
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
