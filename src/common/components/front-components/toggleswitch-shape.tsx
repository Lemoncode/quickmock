import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group, Rect } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      toggleSwitchShapeRestrictions,
      width,
      height
    );

  const isOn = useMemo(
    () => otherProps?.checked ?? true,
    [otherProps?.checked]
  );

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const circleX = isOn
    ? restrictedWidth - restrictedHeight / 2
    : restrictedHeight / 2;

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
