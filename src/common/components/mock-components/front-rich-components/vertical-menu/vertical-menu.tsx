import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import {
  calculateDynamicContentSizeRestriction,
  mapTextToOptions,
} from './vertical-menu.business';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { useGroupShapeProps } from '../../mock-components.utils';

const verticalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 220,
  minHeight: 180,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 120,
  defaultHeight: 180,
};

export const getVerticalMenuShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  verticalMenuShapeSizeRestrictions;

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
      x,
      y,
      width,
      height,
      id,
      onSelected,
      text,
      separator = 'black',
      otherProps,
      ...shapeProps
    } = props;
    const [verticalMenuItems, setVerticalMenuItems] = useState<string[]>([
      'Option 1\nOption 2\n----\nOption 3\nOption 4',
    ]);

    useEffect(() => {
      if (text) {
        const { options } = mapTextToOptions(text);
        setVerticalMenuItems(options);
      } else {
        setVerticalMenuItems([]);
      }
    }, [text]);

    const restrictedSize = calculateDynamicContentSizeRestriction(
      verticalMenuItems,
      {
        width,
        height,
        singleHeaderHeight,
        verticalMenuShapeSizeRestrictions,
      }
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const { stroke, strokeStyle, fill, textColor, borderRadius } =
      useShapeProps(otherProps, BASIC_SHAPE);

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
        {verticalMenuItems.map((option, index) => (
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
              <Text
                x={0}
                y={0 + index * singleHeaderHeight}
                text={option}
                width={restrictedWidth}
                height={singleHeaderHeight}
                fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
                fontSize={15}
                fill={textColor}
                wrap="none"
                ellipsis={true}
              />
            )}
          </Group>
        ))}
      </Group>
    );
  }
);
