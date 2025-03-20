import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Circle, Text } from 'react-konva';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

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

const shapeType: ShapeType = 'browser';

export const BrowserWindowShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, text, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    browserWindowShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 10;
  const titleBarHeight = 30;
  const buttonRadius = 6;
  const urlBarHeight = 20;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Window frame */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={15}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />
      {/* Title bar */}
      <Rect
        x={0}
        y={0}
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
        y={titleBarHeight / 2}
        radius={buttonRadius}
        fill="red"
        stroke="black"
        strokeWidth={1}
      />
      <Circle
        x={margin + 40}
        y={titleBarHeight / 2}
        radius={buttonRadius}
        fill="yellow"
        stroke="black"
        strokeWidth={1}
      />
      <Circle
        x={margin + 60}
        y={titleBarHeight / 2}
        radius={buttonRadius}
        fill="green"
        stroke="black"
        strokeWidth={1}
      />
      {/* Content area */}
      <Rect
        x={margin * 2}
        y={margin * 5}
        width={restrictedWidth - margin * 4}
        height={restrictedHeight - margin * 7}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />
      {/* URL bar */}
      <Rect
        x={margin * 3}
        y={margin * 3 + titleBarHeight}
        width={restrictedWidth - margin * 6}
        height={urlBarHeight}
        cornerRadius={5}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />
      <Text
        x={margin * 4}
        y={margin * 3.5 + titleBarHeight}
        width={restrictedWidth - margin * 7}
        height={urlBarHeight}
        text={text}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={12}
        fill="black"
        ellipsis={true}
        wrap="none"
      />
    </Group>
  );
});
