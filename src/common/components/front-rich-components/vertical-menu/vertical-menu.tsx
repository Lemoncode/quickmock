import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Group, Line, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import {
  calculateDynamicContentSizeRestriction,
  mapTextToOptions,
} from './vertical-menu.business';

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

export const VerticalMenuShape = forwardRef<any, VerticalMenuShapeProps>(
  (
    {
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
    },
    ref
  ) => {
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

    const { width: restrictedWidth, height: restrictedHeight } =
      calculateDynamicContentSizeRestriction(verticalMenuItems, {
        width,
        height,
        singleHeaderHeight,
        verticalMenuShapeSizeRestrictions,
      });

    const stroke = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );

    const fill = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );

    const textColor = useMemo(
      () => otherProps?.textColor ?? 'black',
      [otherProps?.textColor]
    );

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'vertical-menu')}
      >
        <Rect
          x={-10}
          y={-10}
          width={restrictedWidth + 20}
          height={restrictedHeight + 20}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
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
                fontFamily="Comic Sans MS, cursive"
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
