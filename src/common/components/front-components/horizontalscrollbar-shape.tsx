import { Group, Line, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const HorizontalScrollBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: 20,
  defaultWidth: 250,
  defaultHeight: 20,
};

export const getHorizontalScrollBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => HorizontalScrollBarShapeSizeRestrictions;

const shapeType: ShapeType = 'horizontalScrollBar';

export const HorizontalScrollBarShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, ...shapeProps } = props;
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        HorizontalScrollBarShapeSizeRestrictions,
        width,
        height
      );

    const arrowWidth = 20;
    const thumbWidth = restrictedWidth * 0.3; // Ajuste del ancho del thumb al 30% de la barra
    const thumbX =
      arrowWidth + (restrictedWidth - thumbWidth - arrowWidth * 2) / 2; // Centrar el thumb dentro del área disponible

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
        {/* Fondo de la barra de scroll */}
        <Rect
          x={arrowWidth}
          y={0}
          width={restrictedWidth - arrowWidth * 2}
          height={restrictedHeight}
          fill="#D0D0D0"
          stroke="#A0A0A0"
          strokeWidth={1}
        />

        {/* Flecha izquierda */}
        <Rect
          x={0}
          y={0}
          width={arrowWidth}
          height={restrictedHeight}
          fill="#E0E0E0"
          stroke="#A0A0A0"
          strokeWidth={1}
        />

        <Line
          x={4}
          y={restrictedHeight / 2}
          points={[8, -4, 2, 0, 8, 4]}
          fill="black"
          closed={true}
        />

        {/* Thumb de la barra de scroll */}
        <Rect
          x={thumbX}
          y={0}
          width={thumbWidth}
          height={restrictedHeight}
          fill="#C0C0C0"
          stroke="#808080"
          strokeWidth={1}
        />

        {/* Flecha derecha */}
        <Rect
          x={restrictedWidth - arrowWidth}
          y={0}
          width={arrowWidth}
          height={restrictedHeight}
          fill="#E0E0E0"
          stroke="#A0A0A0"
          strokeWidth={1}
        />

        <Line
          x={restrictedWidth - arrowWidth + 6}
          y={restrictedHeight / 2}
          points={[2, -4, 8, 0, 2, 4]}
          fill="black"
          closed={true}
        />
      </Group>
    );
  }
);
