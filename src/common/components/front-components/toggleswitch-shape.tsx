import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useState } from 'react';
import { ShapeProps } from './shape.model';
import { Circle, Group, Rect } from 'react-konva';

export const getToggleSwitchShapeSizeRestrictions =
  (): ShapeSizeRestrictions => ({
    minWidth: 50,
    minHeight: 25,
    maxWidth: 100,
    maxHeight: 35,
  });

export const ToggleSwitch = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const [isOn, setIsOn] = useState(false);

    const handleSwitch = () => {
      //TODO: Only available when shape is selected
      setIsOn(!isOn);
    };

    const circleX = isOn ? width - height / 2 : height / 2;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'toggleswitch')}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          cornerRadius={50}
          stroke="black"
          strokeWidth={2}
          fill={isOn ? 'lightgreen' : 'lightgray'}
        />
        <Circle
          onClick={handleSwitch}
          x={circleX}
          y={height / 2}
          radius={height / 2}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
      </Group>
    );
  }
);
