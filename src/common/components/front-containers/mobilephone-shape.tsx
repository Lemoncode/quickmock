import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const mobilePhoneShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 250,
  defaultHeight: 450,
};

export const getMobilePhoneShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  mobilePhoneShapeSizeRestrictions;

const shapeType: ShapeType = 'mobilePhone';

export const MobilePhoneShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      mobilePhoneShapeSizeRestrictions,
      width,
      height
    );

  const margin = 5;
  const screenMargin = 10;
  const speakerPadding = 10;
  const buttonPadding = 10;
  const speakerWidth = 20;
  const speakerHeight = 5;
  const speakerRadius = 2;
  const buttonRadius = 9;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* Marco del móvil */}
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

      {/* Pantalla del móvil */}
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

      {/* Altavoz */}
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

      {/* Botón de inicio */}
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
