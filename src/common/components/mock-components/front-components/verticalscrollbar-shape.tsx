import { Group, Line, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const VerticalScrollBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 100,
  maxWidth: 20,
  maxHeight: -1,
  defaultWidth: 20,
  defaultHeight: 250,
};

const shapeType: ShapeType = 'verticalScrollBar';

export const getVerticalScrollBarShapeSizeRestrictions =
  (): ShapeSizeRestrictions => VerticalScrollBarShapeSizeRestrictions;

export const VerticalScrollBarShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, ...shapeProps } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      VerticalScrollBarShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const arrowHeight = 20;
    const thumbHeight = restrictedHeight * 0.3; // Ajuste de la altura del thumb al 30% de la barra
    const thumbY =
      arrowHeight + (restrictedHeight - thumbHeight - arrowHeight * 2) / 2; // Centrar el thumb dentro del área disponible

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Fondo de la barra de scroll */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          fill="#D0D0D0"
          stroke="#A0A0A0"
          strokeWidth={1}
        />

        {/* Flecha superior */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={arrowHeight}
          fill="#E0E0E0"
          stroke="#A0A0A0"
          strokeWidth={1}
        />

        <Line
          x={restrictedWidth / 2}
          y={4}
          points={[-2, 8, 0, 2, 4, 8]}
          fill="black"
          closed={true}
        />

        {/* Thumb de la barra de scroll */}
        <Rect
          x={0}
          y={thumbY}
          width={restrictedWidth}
          height={thumbHeight}
          fill="#C0C0C0"
          stroke="#808080"
          strokeWidth={1}
        />

        {/* Flecha inferior */}
        <Rect
          x={0}
          y={restrictedHeight - arrowHeight}
          width={restrictedWidth}
          height={arrowHeight}
          fill="#E0E0E0"
          stroke="#A0A0A0"
          strokeWidth={1}
        />

        <Line
          x={restrictedWidth / 2}
          y={restrictedHeight - arrowHeight + 16}
          points={[-4, -8, 0, -2, 4, -8]}
          fill="black"
          closed={true}
        />
      </Group>
    );
  }
);
