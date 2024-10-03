import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const tabletShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 400,
};

export const getTabletShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabletShapeSizeRestrictions;

const shapeType: ShapeType = 'tablet';

export const TabletShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tabletShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 20;
  const screenMargin = 15;
  const cameraRadius = 3;
  const buttonRadius = 5;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Marco de la tablet */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
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
        x={margin}
        y={restrictedHeight / 2}
        radius={cameraRadius}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* Botón de inicio */}
      <Circle
        x={restrictedWidth - margin}
        y={restrictedHeight / 2}
        radius={buttonRadius}
        stroke="black"
        strokeWidth={1.5}
        shadowBlur={1}
        fill="white"
      />
    </Group>
  );
});
