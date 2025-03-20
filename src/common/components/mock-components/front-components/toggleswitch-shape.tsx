import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group, Rect } from 'react-konva';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from './shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const toggleSwitchShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 100,
  maxHeight: 35,
  defaultWidth: 60,
  defaultHeight: 25,
};

const shapeType: ShapeType = 'toggleswitch';

export const getToggleSwitchShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  toggleSwitchShapeRestrictions;

export const ToggleSwitch = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    toggleSwitchShapeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { isOn } = useShapeProps(otherProps, BASIC_SHAPE);

  const circleX = isOn
    ? restrictedWidth - restrictedHeight / 2
    : restrictedHeight / 2;

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
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={50}
        stroke="black"
        strokeWidth={2}
        fill={isOn ? 'lightgreen' : 'lightgray'}
      />
      <Circle
        x={circleX}
        y={restrictedHeight / 2}
        radius={restrictedHeight / 2}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />
    </Group>
  );
});
