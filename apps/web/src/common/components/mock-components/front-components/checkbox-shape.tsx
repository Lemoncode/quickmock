import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../mock-components.utils';
import { ShapeProps } from '../shape.model';
import {
  CHECKBOX_DEFAULT_HEIGHT,
  checkBoxShapeRestrictions,
} from './checkbox-shape.restrictions';
import { BASIC_SHAPE, DISABLED_COLOR_VALUES } from './shape.const';

const shapeType: ShapeType = 'checkbox';

const marginTick = 5;
const boxTickWidth = CHECKBOX_DEFAULT_HEIGHT;
const tickWidth = boxTickWidth;
const marginText = 3;

export const CheckBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    _x,
    _y,
    width,
    height,
    _id,
    _onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    checkBoxShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { isOn, textColor, disabled } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={boxTickWidth}
        height={restrictedHeight}
        cornerRadius={BASIC_SHAPE.DEFAULT_CORNER_RADIUS}
        stroke={
          disabled
            ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR
            : BASIC_SHAPE.DEFAULT_STROKE_COLOR
        }
        strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
        fill={
          disabled ? DISABLED_COLOR_VALUES.DEFAULT_BACKGROUND_COLOR : 'white'
        }
      />
      {isOn && (
        <Line
          x={0}
          y={0}
          points={[
            marginTick,
            boxTickWidth / 2,
            marginTick + boxTickWidth / 5,
            boxTickWidth - marginTick,
            tickWidth - marginTick,
            marginTick,
          ]}
          stroke={
            disabled
              ? DISABLED_COLOR_VALUES.DEFAULT_STROKE_COLOR
              : BASIC_SHAPE.DEFAULT_STROKE_COLOR
          }
          strokeWidth={BASIC_SHAPE.DEFAULT_STROKE_WIDTH}
          lineCap="round"
          lineJoin="round"
        />
      )}
      <Text
        x={boxTickWidth + BASIC_SHAPE.DEFAULT_PADDING}
        y={marginText}
        width={restrictedWidth - boxTickWidth - BASIC_SHAPE.DEFAULT_PADDING}
        height={restrictedHeight - marginText}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill={disabled ? DISABLED_COLOR_VALUES.DEFAULT_TEXT_COLOR : textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
