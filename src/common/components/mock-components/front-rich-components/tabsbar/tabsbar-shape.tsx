import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../../shape.model';
import { useGroupShapeProps } from '../../mock-components.utils';
import { useTabList } from './tab-list.hook';

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

  // Tab dimensions and margin
  const tabHeight = 30; // Tab height
  const tabsGap = 10; // Horizontal margin between tabs
  const tabXPadding = 20;
  const tabFont = { fontSize: 14, fontFamily: 'Arial' };
  const bodyHeight = restrictedHeight - tabHeight - 10; // Height of the tabs bar body

  const tabList = useTabList({
    text,
    containerWidth: restrictedWidth - tabsGap * 2, //left and right tabList margin
    minTabWidth: 40, // Min-width of each tab, without xPadding
    tabXPadding,
    tabsGap,
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
      {tabList.map(({ tab, width, xPos }, index) => {
        return (
          <Group key={index} x={10 + xPos} y={10}>
            <Rect
              width={width}
              height={tabHeight}
              fill={index === activeTab ? 'white' : '#E0E0E0'}
              stroke="black"
              strokeWidth={1}
            />
            <Text
              x={tabXPadding}
              y={8}
              width={width - tabXPadding * 2}
              height={tabHeight}
              ellipsis={true}
              wrap="none"
              text={tab}
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
