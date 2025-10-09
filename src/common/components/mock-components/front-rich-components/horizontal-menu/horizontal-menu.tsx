import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import {
  extractCSVHeaders,
  splitCSVContentIntoRows,
} from '@/common/utils/active-element-selector.utils';
import { useGroupShapeProps } from '../../mock-components.utils';

const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getHorizontalMenuShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalMenuShapeSizeRestrictions;

const shapeType: ShapeType = 'horizontal-menu';

export const HorizontalMenu = forwardRef<any, ShapeProps>((props, ref) => {
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

  const csvData = splitCSVContentIntoRows(text);
  const headers = extractCSVHeaders(csvData[0]);
  const itemLabels = headers.map(header => header.text);

  const numberOfItems = itemLabels.length;
  const itemSpacing = 10;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    horizontalMenuShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const totalMargins = restrictedWidth - itemSpacing * (numberOfItems + 1);
  const itemWidth = totalMargins / numberOfItems;

  const { stroke, strokeStyle, fill, textColor, borderRadius, fontSize } =
    useShapeProps(otherProps, BASIC_SHAPE);

  const itemVerticalPadding = 4;

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
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
        cornerRadius={borderRadius}
      />

      {itemLabels.map((header, index) => (
        <Group key={index}>
          <Rect
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={itemVerticalPadding}
            width={itemWidth}
            height={restrictedHeight - 2 * itemVerticalPadding}
            fill={index === activeSelected ? 'lightblue' : fill}
          />
          <Text
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={restrictedHeight / 2 - 8}
            text={header}
            fontFamily="Arial"
            fontSize={fontSize}
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
});
