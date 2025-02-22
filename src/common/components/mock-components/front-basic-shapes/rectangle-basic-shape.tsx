import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Line, Rect } from 'react-konva';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';

const rectangleShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 160,
  defaultHeight: 160,
};

export const getRectangleShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  rectangleShapeRestrictions;

const shapeType = 'rectangle';

export const RectangleShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    rectangleShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke, strokeStyle, fill, borderRadius } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  // const borders = [true, true, false, false];

  const lines = [
    [0, 0, restrictedWidth, 0],
    [restrictedWidth, 0, restrictedWidth, restrictedHeight],
    [restrictedWidth, restrictedHeight, 0, restrictedHeight],
    [0, 0, 0, restrictedHeight],
  ];

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* {borders.map((border, index) => {
        if (border) {
          return (
            <Line
              key={index}
              points={lines[index]}
              stroke="red"
              strokeWidth={5}
              closed={true}
              lineJoin="round"
            />
          );
          return null;
        }
      })} */}

      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        strokeWidth={2}
        stroke={stroke}
        fill={fill}
        dash={strokeStyle}
        cornerRadius={borderRadius}
      />

      <Line
        points={lines[0]}
        stroke="fill"
        strokeWidth={2}
        closed={true}
        lineJoin="round"
      />
    </Group>
  );
});
