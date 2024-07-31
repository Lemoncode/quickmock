import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { Group, Rect, Circle, Text } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';

export const getBrowserWindowShapeSizeRestrictions =
  (): ShapeSizeRestrictions => ({
    minWidth: 200,
    minHeight: 150,
    maxWidth: 1000,
    maxHeight: 1000,
    defaultWidth: 400,
    defaultHeight: 300,
  });

export const BrowserWindowShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const margin = 10;
    const titleBarHeight = 30;
    const buttonRadius = 6;
    const urlBarHeight = 20;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={width}
        height={height}
        {...shapeProps}
        onClick={() => onSelected(id, 'browser')}
      >
        {/* Window frame */}
        <Rect
          x={margin}
          y={margin}
          width={width - 2 * margin}
          height={height - 2 * margin}
          cornerRadius={15}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />
        {/* Title bar */}
        <Rect
          x={margin}
          y={margin}
          width={width - 2 * margin}
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
          y={margin + titleBarHeight + 7}
          width={width - 4 * margin}
          height={height - titleBarHeight - 3 * margin - 10}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />
        {/* URL bar */}
        <Rect
          x={margin * 3}
          y={margin + titleBarHeight + 15}
          width={width - 6 * margin}
          height={urlBarHeight}
          cornerRadius={5}
          stroke="black"
          strokeWidth={1}
          fill="white"
        />
        <Text
          x={margin * 3 + 5}
          y={margin + titleBarHeight + 20}
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
