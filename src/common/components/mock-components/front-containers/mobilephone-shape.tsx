import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const mobilePhoneShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 300,
  defaultHeight: 560,
};

export const getMobilePhoneShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  mobilePhoneShapeSizeRestrictions;

const shapeType: ShapeType = 'mobilePhone';

export const MobilePhoneShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    mobilePhoneShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 5;
  const screenMargin = 10;
  const speakerPadding = 10;
  const buttonPadding = 10;
  const speakerWidth = 20;
  const speakerHeight = 5;
  const speakerRadius = 2;
  const buttonRadius = 9;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Mobile Frame */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={30}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />

      {/* Mobile Screen */}
      <Rect
        x={margin + screenMargin}
        y={screenMargin * 3}
        width={restrictedWidth - 2 * margin - 2 * screenMargin}
        height={restrictedHeight - 2 * margin - 6 * screenMargin}
        cornerRadius={10}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* LoudSpeaker */}
      <Rect
        x={(restrictedWidth - speakerWidth) / 2}
        y={speakerPadding}
        width={speakerWidth}
        height={speakerHeight}
        cornerRadius={speakerRadius}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* Init button */}
      <Circle
        x={restrictedWidth / 2}
        y={restrictedHeight - margin - buttonPadding}
        radius={buttonRadius}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />
    </Group>
  );
});

export default MobilePhoneShape;
