import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Circle, Group, Rect } from 'react-konva';

const toggleSwitchShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 25,
  maxWidth: 100,
  maxHeight: 35,
  defaultWidth: 60,
  defaultHeight: 25,
};

export const getToggleSwitchShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  toggleSwitchShapeRestrictions;

export const ToggleSwitch = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        toggleSwitchShapeRestrictions,
        width,
        height
      );

    const [isOn, setIsOn] = useState(otherProps?.checked ?? false);

    const handleSwitch = () => {
      setIsOn(!isOn);
    };

    useEffect(() => {
      if (otherProps?.checked != undefined) {
        setIsOn(otherProps?.checked);
      }
    }, [otherProps?.checked]);

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
        onClick={() => onSelected(id, 'toggleswitch')}
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
          onClick={handleSwitch}
          x={circleX}
          y={restrictedHeight / 2}
          radius={restrictedHeight / 2}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
      </Group>
    );
  }
);
