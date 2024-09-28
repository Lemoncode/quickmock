import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';

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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(tabletShapeSizeRestrictions, width, height);
  const margin = 20;
  const screenMargin = 15;
  const cameraRadius = 3;
  const buttonRadius = 5;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
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
