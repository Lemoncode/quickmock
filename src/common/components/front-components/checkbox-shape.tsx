import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Line, Text } from 'react-konva';

const checkBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 200,
  defaultHeight: 50,
};

export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  checkBoxShapeRestrictions;

const marginTick = 5;
const boxTickWidth = 50;
const tickWidth = boxTickWidth - marginTick;

export const CheckBoxShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(checkBoxShapeRestrictions, width, height);

    const [isOn, setIsOn] = useState(otherProps?.checked ?? false);

    useEffect(() => {
      if (otherProps?.checked != undefined) {
        setIsOn(otherProps?.checked);
      }
    }, [otherProps?.checked]);

    const handleClick = () => {
      setIsOn(!isOn);
    };

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => {
          onSelected(id, 'checkbox');
          handleClick();
        }}
      >
        <Rect
          x={0}
          y={0}
          width={boxTickWidth}
          height={restrictedHeight}
          cornerRadius={5}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        {isOn && (
          <Line
            points={[
              marginTick,
              restrictedHeight / 2,
              marginTick + boxTickWidth / 4,
              restrictedHeight - marginTick,
              tickWidth - marginTick,
              marginTick,
            ]}
            stroke="black"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
          />
        )}
        <Text
          x={boxTickWidth + marginTick}
          y={restrictedHeight / 3}
          width={restrictedWidth - boxTickWidth - marginTick}
          height={restrictedHeight / 3}
          text={text}
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill="black"
          align="left"
          verticalAlign="middle"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
