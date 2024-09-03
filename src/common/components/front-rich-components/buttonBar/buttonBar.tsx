import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Group, Path, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { mapButtonBarTextToItems } from './buttonBar.utils';

const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getButtonBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  horizontalMenuShapeSizeRestrictions;

export const ButtonBarShape = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const [buttonItems, setButtonItems] = useState<string[]>([]);

    useEffect(() => {
      if (typeof text === 'string') {
        const { items } = mapButtonBarTextToItems(text);
        setButtonItems(items);
      } else {
        setButtonItems([]);
      }
    }, [text]);

    const numberOfItems = buttonItems.length;

    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        horizontalMenuShapeSizeRestrictions,
        width,
        height
      );

    const itemWidth =
      numberOfItems > 0 ? restrictedWidth / numberOfItems : restrictedWidth;

    const textColor = useMemo(
      () => otherProps?.textColor ?? 'black',
      [otherProps?.textColor]
    );
    const backgroundColor = useMemo(
      () => otherProps?.backgroundColor ?? 'white',
      [otherProps?.backgroundColor]
    );
    const strokeColor = useMemo(
      () => otherProps?.stroke ?? 'black',
      [otherProps?.stroke]
    );
    const strokeStyle = useMemo(
      () => otherProps?.strokeStyle ?? [],
      [otherProps?.strokeStyle]
    );

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'horizontal-menu', true)}
      >
        <Path
          data={`M0,0 H${restrictedWidth} V${restrictedHeight} H0 Z`}
          stroke={strokeColor}
          strokeWidth={2}
          dash={strokeStyle}
          fill={backgroundColor}
        />

        {buttonItems.map((e: string, index: number) => (
          <Group key={index}>
            {/* Vertical strokes */}
            <Path
              data={`M${index * itemWidth},0 V${restrictedHeight}`}
              stroke={strokeColor}
              strokeWidth={1}
              dash={strokeStyle}
            />
            <Text
              x={index * itemWidth}
              y={restrictedHeight / 2 - 8}
              text={e}
              fontFamily="Arial"
              fontSize={16}
              fill={textColor}
              width={itemWidth}
              align="center"
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ))}
      </Group>
    );
  }
);

export default ButtonBarShape;
