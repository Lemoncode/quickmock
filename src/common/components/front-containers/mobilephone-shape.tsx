import { forwardRef } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeProps } from '../front-components/shape.model';

export const mobilePhoneShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 400,
  defaultHeight: 300,
};

export const getMobilePhoneShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  mobilePhoneShapeSizeRestrictions;

export const MobilePhoneShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const handleClick = () => {
      onSelected(id, 'mobilePhone');
    };

    const margin = 20;
    const screenMargin = 10;
    const speakerPadding = 10;
    const buttonPadding = 10;
    const speakerWidth = 20;
    const speakerHeight = 5;
    const speakerRadius = 2;
    const buttonRadius = 9;

    return (
      <Group x={x} y={y} ref={ref} {...shapeProps} onClick={handleClick}>
        {/* Marco del móvil */}
        <Rect
          x={margin}
          y={margin}
          width={width - 2 * margin}
          height={height - 2 * margin}
          cornerRadius={30}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />

        {/* Pantalla del móvil */}
        <Rect
          x={margin + screenMargin}
          y={margin + screenMargin * 3}
          width={width - 2 * margin - 2 * screenMargin}
          height={height - 2 * margin - 6 * screenMargin}
          cornerRadius={10}
          stroke="black"
          strokeWidth={1}
          fill="none"
        />

        {/* Altavoz */}
        <Rect
          x={(width - speakerWidth) / 2}
          y={margin + speakerPadding}
          width={speakerWidth}
          height={speakerHeight}
          cornerRadius={speakerRadius}
          stroke="black"
          strokeWidth={1}
          fill="none"
        />

        {/* Botón de inicio */}
        <Circle
          cx={width / 2}
          cy={height - margin - buttonPadding}
          r={buttonRadius}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
      </Group>
    );
  }
);

export default MobilePhoneShape;
