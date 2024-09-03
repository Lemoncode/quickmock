import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from './shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Line, Text } from 'react-konva';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { BASIC_SHAPE } from './shape.const';

const checkBoxShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 30,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 200,
  defaultHeight: 50,
};

const shapeType: ShapeType = 'checkbox';

export const getCheckboxShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  checkBoxShapeRestrictions;

const marginTick = 5;
const boxTickWidth = 50;
const tickWidth = boxTickWidth - marginTick;

export const CheckBoxShape = forwardRef<any, ShapeProps>((props, ref) => {
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
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(checkBoxShapeRestrictions, width, height);

  const isOn = useMemo(
    () => otherProps?.checked ?? true,
    [otherProps?.checked]
  );
  const textColor = useMemo(
    () => otherProps?.textColor ?? 'black',
    [otherProps?.textColor]
  );

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
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={20}
        fill={textColor}
        align="left"
        verticalAlign="middle"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
