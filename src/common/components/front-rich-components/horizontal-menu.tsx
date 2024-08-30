import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { INPUT_SHAPE } from '../front-components/shape.const';

const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 75,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 200,
  defaultHeight: 50,
};

export const getHorizontalMenuShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalMenuShapeSizeRestrictions;

export const HorizontalMenu = forwardRef<any, ShapeProps>(
  (
    { x, y, width, height, id, onSelected, text, otherProps, ...shapeProps },
    ref
  ) => {
    const menuElements: string[] = text.split(',');
    const numberOfItems = menuElements.length;
    const minItemWidth = 100;
    const itemSpacing = 20;
    const totalWidth = Math.max(
      minItemWidth * numberOfItems + itemSpacing * (numberOfItems + 1),
      width
    );
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        horizontalMenuShapeSizeRestrictions,
        totalWidth,
        height
      );
    const totalMargins = restrictedWidth - itemSpacing * (numberOfItems + 1);
    const itemWidth = totalMargins / numberOfItems;

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

    const borderRadius = useMemo(() => {
      const radius = Number(otherProps?.borderRadius);
      return isNaN(radius) ? INPUT_SHAPE.DEFAULT_CORNER_RADIUS : radius;
    }, [otherProps?.borderRadius]);

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'horizontal-menu')}
      >
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke={strokeColor}
          strokeWidth={2}
          dash={strokeStyle}
          fill={backgroundColor}
          cornerRadius={borderRadius}
        />

        {menuElements.map((e: string, index: number) => (
          <Group key={index}>
            <Text
              x={itemSpacing * (index + 1) + itemWidth * index}
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
