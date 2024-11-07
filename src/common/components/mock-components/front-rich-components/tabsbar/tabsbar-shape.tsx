import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../../shape.model';
import {
  extractCSVHeaders,
  splitCSVContentIntoRows,
} from '@/common/utils/active-element-selector.utils';
import { useGroupShapeProps } from '../../mock-components.utils';
import { adjustTabWidths } from './business/tabsbar.business';

const tabsBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 450,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 450,
  defaultHeight: 180,
};

export const getTabsBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabsBarShapeSizeRestrictions;

const shapeType: ShapeType = 'tabsBar';

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
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tabsBarShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const csvData = splitCSVContentIntoRows(text);
  const headers = extractCSVHeaders(csvData[0]);
  const tabLabels = headers.map(header => header.text);

  // Calculate tab dimensions and margin
  const minTabWidth = 40; // Min-width of each tab, without xPadding
  const tabHeight = 30; // Tab height
  const tabMargin = 10; // Horizontal margin between tabs
  const tabXPadding = 20;
  const tabFont = { fontSize: 14, fontFamily: 'Arial' };
  const bodyHeight = restrictedHeight - tabHeight - 10; // Height of the tabs bar body

  const tabAdjustedWidths = adjustTabWidths({
    tabs: tabLabels,
    containerWidth: restrictedWidth - tabMargin * 2, //left and right tabList margin
    minTabWidth,
    tabXPadding,
    tabsGap: tabMargin,
    font: tabFont,
  });

  const activeTab = otherProps?.activeElement ?? 0;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Background of the tab bar body */}
      <Rect
        x={0}
        y={tabHeight + 10}
        width={restrictedWidth}
        height={bodyHeight}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />
      {/* Map through headerRow to create tabs */}
      {tabLabels.map((header, index) => {
        const { widthList: newWidthList, relativeTabPosition: xPosList } =
          tabAdjustedWidths;

        return (
          <Group key={index} x={10 + xPosList[index]} y={10}>
            <Rect
              width={newWidthList[index]}
              height={tabHeight}
              fill={index === activeTab ? 'white' : '#E0E0E0'}
              stroke="black"
              strokeWidth={1}
            />
            <Text
              x={tabXPadding}
              y={8}
              width={newWidthList[index] - tabXPadding * 2}
              height={tabHeight}
              ellipsis={true}
              wrap="none"
              text={header} // Use the header text
              fontFamily={tabFont.fontFamily}
              fontSize={tabFont.fontSize}
              fill="black"
            />
          </Group>
        );
      })}
    </Group>
  );
});
