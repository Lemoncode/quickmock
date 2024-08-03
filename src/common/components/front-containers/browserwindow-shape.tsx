import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Circle, Text } from 'react-konva';

const browserWindowShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 800,
  defaultHeight: 600,
};

export const getBrowserWindowShapeSizeRestrictions =
  (): ShapeSizeRestrictions => browserWindowShapeSizeRestrictions;

export const BrowserWindowShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        browserWindowShapeSizeRestrictions,
        width,
        height
      );
    const margin = 10;
    const titleBarHeight = 30;
    const buttonRadius = 6;
    const urlBarHeight = 20;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'browser')}
      >
        {/* Window frame */}
        <Rect
          x={margin}
          y={margin}
          width={restrictedWidth}
          height={restrictedHeight}
          cornerRadius={15}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        {/* Title bar */}
        <Rect
          x={margin}
          y={margin}
          width={restrictedWidth}
          height={titleBarHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        {/* Title bar buttons */}
        <Circle
          x={margin + 20}
          y={margin + titleBarHeight / 2}
          radius={buttonRadius}
          fill="red"
          stroke="black"
          strokeWidth={1}
        />
        <Circle
          x={margin + 40}
          y={margin + titleBarHeight / 2}
          radius={buttonRadius}
          fill="yellow"
          stroke="black"
          strokeWidth={1}
        />
        <Circle
          x={margin + 60}
          y={margin + titleBarHeight / 2}
          radius={buttonRadius}
          fill="green"
          stroke="black"
          strokeWidth={1}
        />
        {/* Content area */}
        <Rect
          x={margin * 2}
          y={margin + 40}
          width={restrictedWidth - 20}
          height={restrictedHeight - 50}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />
        {/* URL bar */}
        <Rect
          x={margin * 3}
          y={margin + titleBarHeight + 15}
          width={restrictedWidth - 40}
          height={urlBarHeight}
          cornerRadius={5}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />
        <Text
          x={margin * 3 + 5}
          y={margin + titleBarHeight + 20}
          width={restrictedWidth - 50}
          height={restrictedHeight - 50}
          text="https://example.com"
          fontFamily="Comic Sans MS, cursive"
          fontSize={12}
          fill="black"
          ellipsis={true}
          wrap="none"
        />
      </Group>
    );
  }
);
