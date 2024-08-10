import { Group, Line, Path, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const accordionShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 280,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 280,
  defaultHeight: 200,
};

export const getAccordionShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  accordionShapeSizeRestrictions;

export const AccordionShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        accordionShapeSizeRestrictions,
        width,
        height
      );

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'accordion')}
      >
        <Rect
          x={10}
          y={10}
          width={restrictedWidth}
          height={50}
          fill="#f0f0f0"
          stroke="black"
          strokeWidth={2}
        />
        {/* down arrow triangle */}
        <Line points={[30, 45, 40, 25, 20, 25]} closed fill="black" />
        <Text
          x={60}
          y={40}
          text="Section 1"
          fontFamily="Arial"
          fontSize={20}
          fill="black"
        />

        {/* Contenido de la sección 1 */}
        <Rect
          x={10}
          y={60}
          width={restrictedWidth}
          height={100}
          fill="#ffffff"
          stroke="black"
          strokeWidth={1}
        />
        <Text
          x={20}
          y={90}
          text="Content of section 1"
          fontFamily="Arial"
          fontSize={16}
          fill="black"
        />

        {/* Sección 2: Colapsada */}
        <Rect
          x={10}
          y={160}
          width={restrictedWidth}
          height={50}
          fill="#f0f0f0"
          stroke="black"
          strokeWidth={2}
        />
        {/* Right arrow triangle */}
        <Line points={[30, 175, 50, 185, 30, 195]} closed fill="black" />
        <Text
          x={60}
          y={180}
          text="Section 2"
          fontFamily="Arial"
          fontSize={20}
          fill="black"
        />
      </Group>
    );
  }
);
