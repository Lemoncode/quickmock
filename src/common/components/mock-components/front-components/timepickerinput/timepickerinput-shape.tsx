import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Text } from 'react-konva';
import { BASIC_SHAPE } from '../shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { splitCSVContent, setTime } from './timepickerinput-shape.business';

const timepickerInputShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 220,
  defaultHeight: 50,
};

const shapeType: ShapeType = 'timepickerinput';

export const getTimepickerInputShapeSizeRestrictions =
  (): ShapeSizeRestrictions => timepickerInputShapeRestrictions;

export const TimepickerInputShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const {
      x,
      y,
      width,
      height,
      id,
      text,
      onSelected,
      otherProps,
      ...shapeProps
    } = props;

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      timepickerInputShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const csvData2 = splitCSVContent(text);
    const time = setTime(csvData2);

    const separatorPadding = 3; // Extra padding for spacers
    const separator1X = restrictedWidth / 3;
    const separator2X = (2 * restrictedWidth) / 3;

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

    const dynamicTabWidth = restrictedWidth / time.length;

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* input frame */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={borderRadius}
          stroke={stroke}
          strokeWidth={2}
          dash={strokeStyle}
          fill={fill}
        />

        {time.map((time, index) => (
          <Group>
            <Text
              key={index}
              x={index * dynamicTabWidth}
              y={18}
              width={dynamicTabWidth}
              height={restrictedHeight - 20}
              ellipsis={true}
              wrap="none"
              text={time} // Use the header text
              fontFamily="Arial"
              fontSize={16}
              align="center"
            />
            {index < time.length - 1 && (
              <Text
                x={(index + 1) * dynamicTabWidth - 4}
                y={restrictedHeight / separatorPadding}
                width={8}
                height={restrictedHeight - 20}
                text=":"
                fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
                fontSize={20}
                fill={stroke}
                align="center"
              />
            )}
          </Group>
        ))}
      </Group>
    );
  }
);
