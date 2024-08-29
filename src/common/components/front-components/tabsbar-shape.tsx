import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from './shape.model';

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

export const TabsBarShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, otherProps, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        tabsBarShapeSizeRestrictions,
        width,
        height
      );

    const tabWidth = 106; // Ancho de cada pestaña
    const tabHeight = 30; // Altura de las pestañas
    const bodyHeight = restrictedHeight - tabHeight - 10; // Altura del cuerpo de la tabs bar

    return (
      <Group
        x={x}
        y={y}
        width={restrictedWidth}
        height={restrictedHeight}
        ref={ref}
        {...shapeProps}
        onClick={() => onSelected(id, 'tabsbar')}
      >
        <Rect
          x={0}
          y={tabHeight + 10}
          width={restrictedWidth}
          height={bodyHeight}
          stroke="black"
          strokeWidth={1}
          fill="lightgray"
        />

        {/* Tab 1 */}
        <Group x={10} y={10}>
          <Rect
            width={tabWidth}
            height={tabHeight}
            fill="white"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={20}
            y={8}
            text="Tab 1"
            fontFamily="Arial"
            fontSize={14}
            fill="black"
          />
        </Group>

        {/* Tab 2 */}
        <Group x={126} y={10}>
          <Rect
            width={tabWidth}
            height={tabHeight}
            fill="#E0E0E0"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={20}
            y={8}
            text="Tab 2"
            fontFamily="Arial"
            fontSize={14}
            fill="black"
          />
        </Group>

        {/* Tab 3 */}
        <Group x={242} y={10}>
          <Rect
            width={tabWidth}
            height={tabHeight}
            fill="#E0E0E0"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={20}
            y={8}
            text="Tab 3"
            fontFamily="Arial"
            fontSize={14}
            fill="black"
          />
        </Group>
      </Group>
    );
  }
);
