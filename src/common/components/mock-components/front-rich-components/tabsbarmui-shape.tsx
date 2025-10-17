import { forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useGroupShapeProps } from '../mock-components.utils';
import { useTabList } from './tabsbar/tab-list.hook';

const tabsBarMUIShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 450,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 450,
  defaultHeight: 180,
};

export const getTabsBarMUIShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  tabsBarMUIShapeSizeRestrictions;

const shapeType: ShapeType = 'tabsBarMUI';

export const TabsBarMUIShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { width, height, text, otherProps, ...shapeProps } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    tabsBarMUIShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth } = restrictedSize;

  const tabsGap = 10;
  const tabXPadding = 20;
  const font = { fontSize: 14, fontFamily: 'Roboto, Arial, sans-serif' };
  const activeColor = '#1976D2';
  const inactiveColor = 'rgba(0,0,0,0.6)';
  const dividerColor = '#E0E0E0';

  const tabList = useTabList({
    text,
    containerWidth: restrictedWidth - tabsGap * 2,
    minTabWidth: 40,
    tabXPadding,
    tabsGap,
    font,
  });

  const activeTab = otherProps?.activeElement ?? 0;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const indicatorY = 26;
  const dividerY = 39.5; // ⬅️ subimos ligeramente la línea gris

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Línea gris inferior (empieza después del tab activo) */}
      <Line
        points={[10, dividerY, restrictedWidth, dividerY]}
        stroke={dividerColor}
        strokeWidth={1}
      />

      {/* Tabs */}
      {tabList.map(({ tab, width, xPos }, index) => {
        const x = 10 + xPos;
        return (
          <Group key={index} x={x} y={10}>
            <Text
              x={0}
              y={18 - font.fontSize / 2}
              text={tab}
              fontFamily={font.fontFamily}
              fontSize={font.fontSize}
              fontStyle="500"
              fill={index === activeTab ? activeColor : inactiveColor}
            />
            {index === activeTab && (
              <Rect
                x={0}
                y={indicatorY}
                width={width}
                height={3}
                cornerRadius={2}
                fill={activeColor}
              />
            )}
          </Group>
        );
      })}
    </Group>
  );
});
