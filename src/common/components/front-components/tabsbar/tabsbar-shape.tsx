import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { parseCSVHeader, splitCSVIntoRows } from './tabsbar.utils';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';

const tabsBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 450,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 450,
  defaultHeight: 150,
};

export const getTabsBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabsBarShapeSizeRestrictions;

const shapeType: ShapeType = 'tabsbar';

export const TabsBarShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    fitSizeToShapeSizeRestrictions(tabsBarShapeSizeRestrictions, width, height);

  const csvData = splitCSVIntoRows(text);
  const headers = parseCSVHeader(csvData[0]);
  const tabLabels = headers.map(header => header.text);

  // Calculate tab dimensions and margin
  const tabWidth = 106; // Width of each tab
  const tabHeight = 30; // Tab height
  const tabMargin = 10; // Horizontal margin between tabs
  const bodyHeight = restrictedHeight - tabHeight - 10; // Height of the tabs bar body
  const totalTabsWidth = tabLabels.length * (tabWidth + tabMargin) + tabWidth; // Total width required plus one additional tab

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      width={Math.max(restrictedWidth, totalTabsWidth)} // Ensures that the total width is sufficient
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* Background of the tab bar body */}
      <Rect
        x={0}
        y={tabHeight + 10}
        width={Math.max(restrictedWidth, totalTabsWidth)} // Adjusts the width of the background to include an additional tab
        height={bodyHeight}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />
      {/* Map through headerRow to create tabs */}
      {tabLabels.map((header, index) => (
        <Group key={index} x={10 + index * (tabWidth + tabMargin)} y={10}>
          <Rect
            width={tabWidth}
            height={tabHeight}
            fill={index === 0 ? 'white' : '#E0E0E0'} // First tab is selected
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={20}
            y={8}
            width={tabWidth - 20}
            height={tabHeight}
            ellipsis={true}
            wrap="none"
            text={header} // Use the header text
            fontFamily="Arial"
            fontSize={14}
            fill="black"
          />
        </Group>
      ))}
    </Group>
  );
});
