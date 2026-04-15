import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { joinTextContent } from './vertical-menu.business';
import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { verticalMenuShapeSizeRestrictions } from './vertical-menu.restrictions';

interface VerticalMenuShapeProps extends ShapeProps {
  text: string;
  separator?: string;
  onSelected: (id: string, type: string) => void;
}

const singleHeaderHeight = 35;

const shapeType: ShapeType = 'vertical-menu';

export const VerticalMenuShape = forwardRef<any, VerticalMenuShapeProps>(
  (props, ref) => {
    const {
      _x,
      _y,
      width,
      height,
      _id,
      _onSelected,
      text,
      _separator = 'black',
      otherProps,
      ...shapeProps
    } = props;

    const csvData = joinTextContent(text);

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      verticalMenuShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const { stroke, strokeStyle, fill, textColor, borderRadius } =
      useShapeProps(otherProps, BASIC_SHAPE);

    const activeSelected = otherProps?.activeElement ?? 0;

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        <Rect
          x={-10}
          y={-10}
          width={restrictedWidth + 20}
          height={restrictedHeight + 20}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
          dash={strokeStyle}
          cornerRadius={borderRadius}
        />
        {csvData.map((option, index) => (
          <Group key={index}>
            {option === '----' ? (
              <Line
                x={0}
                y={0 + index * singleHeaderHeight + 5}
                points={[0, 0, restrictedWidth, 0]}
                stroke={stroke}
                strokeWidth={2}
              />
            ) : (
              <>
                <Rect
                  x={-3}
                  y={-6 + index * singleHeaderHeight}
                  width={restrictedWidth + 7}
                  height={singleHeaderHeight}
                  fill={index === activeSelected ? 'lightblue' : fill}
                />
                <Text
                  x={4}
                  y={5 + index * singleHeaderHeight}
                  text={option}
                  width={restrictedWidth}
                  height={singleHeaderHeight}
                  fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
                  fontSize={15}
                  fill={textColor}
                  wrap="none"
                  ellipsis={true}
                />
              </>
            )}
          </Group>
        ))}
      </Group>
    );
  }
);
