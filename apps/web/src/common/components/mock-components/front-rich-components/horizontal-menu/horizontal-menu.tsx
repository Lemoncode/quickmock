import {
  extractCSVHeaders,
  splitCSVContentIntoRows,
} from '#common/utils/active-element-selector.utils';
import { fitSizeToShapeSizeRestrictions } from '#common/utils/shapes/shape-restrictions';
import { ShapeType } from '#core/model';
import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import {
  MultipleItemsInfo,
  useResizeOnFontSizeChange,
} from '../../front-text-components/front-text-hooks/resize-fontsize-change.hook';
import { useGroupShapeProps } from '../../mock-components.utils';
import { ShapeProps } from '../../shape.model';
import { horizontalMenuShapeSizeRestrictions } from './horizontal-menu.restrictions';

const shapeType: ShapeType = 'horizontal-menu';

export const HorizontalMenu = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    _onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;

  const csvData = splitCSVContentIntoRows(text);
  const headers = extractCSVHeaders(csvData[0]);
  const itemLabels = headers.map(header => header.text);
  const totalVerticalPadding = 8;
  const numberOfItems = itemLabels.length;
  const itemSpacing = 10;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    horizontalMenuShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  const totalHorizontalMargins =
    restrictedWidth - itemSpacing * (numberOfItems + 1);
  const itemWidth = totalHorizontalMargins / numberOfItems;

  const {
    stroke,
    strokeStyle,
    fill,
    textColor,
    borderRadius,
    fontSize,
    fontVariant,
  } = useShapeProps(otherProps, BASIC_SHAPE);

  const singleVerticalPadding = totalVerticalPadding / 2;

  const activeSelected = otherProps?.activeElement ?? 0;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const multiplesItemsInfo: MultipleItemsInfo = {
    numberOfItems: numberOfItems,
    horizontalSpacing: itemSpacing,
  };

  useResizeOnFontSizeChange(
    id,
    { x, y },
    text,
    fontSize,
    fontVariant,
    false,
    multiplesItemsInfo
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Main Rectangle*/}
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
          {/* Blue selected rectangle */}
          <Rect
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={singleVerticalPadding}
            width={itemWidth}
            height={restrictedHeight - totalVerticalPadding}
            fill={index === activeSelected ? 'lightblue' : fill}
          />
          <Text
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={restrictedHeight / 2 - fontSize / 2}
            text={header}
            fontFamily="Arial"
            fontSize={fontSize}
            fill={textColor}
            width={itemWidth}
            align="center"
            wrap="none"
            ellipsis={true}
            fontVariant={fontVariant}
          />
        </Group>
      ))}
    </Group>
  );
});
