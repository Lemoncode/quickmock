import { Group, Line, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { AccordionBody } from './components/accordion-body.component';

const accordionShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 315,
  minHeight: 225,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 315,
  defaultHeight: 225,
};

export const getAccordionShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  accordionShapeSizeRestrictions;

const singleHeaderHeight = 50;
const minimumAccordionBodyHeight = 50;

export const AccordionShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const [sections, setSections] = useState<string[]>([
      'Sección A',
      'Sección B',
    ]);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

    useEffect(() => {
      if (text) {
        const sections = text.split('\n');
        setSections(sections);
        // right now let's set a default value, TODO enhance this
        setSelectedSectionIndex(0);
      } else {
        setSections([]);
      }
    }, [text]);

    const accordionSelectedBodyHeight = useMemo(() => {
      const accordionsHeadersHeight = singleHeaderHeight * sections.length;
      let accordionSelectedBodyHeight = height - accordionsHeadersHeight;

      if (accordionSelectedBodyHeight < 0) {
        accordionSelectedBodyHeight = minimumAccordionBodyHeight;
      }

      return accordionSelectedBodyHeight;
    }, [sections, height]);

    const calculateDynamicContentSizeRestriction = () => {
      // Accordion section height:
      const accordionsHeadersHeight = singleHeaderHeight * sections.length;

      const restrictedSize = fitSizeToShapeSizeRestrictions(
        accordionShapeSizeRestrictions,
        width,
        height
      );

      restrictedSize.height =
        accordionsHeadersHeight + accordionSelectedBodyHeight;

      return restrictedSize;
    };

    const { width: restrictedWidth, height: restrictedHeight } =
      calculateDynamicContentSizeRestriction();

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'accordion')}
        fill="black"
      >
        {sections.map((section, index) => (
          <>
            <Rect
              key={index}
              x={10}
              y={singleHeaderHeight * index}
              width={restrictedWidth}
              height={singleHeaderHeight}
              fill="#f0f0f0"
              stroke="black"
              strokeWidth={2}
            />
            <Text
              x={20}
              y={20 + 50 * index}
              text={section}
              fontFamily="Arial"
              fontSize={20}
              fill="black"
            />
          </>
        ))}
        <AccordionBody
          x={10}
          y={singleHeaderHeight * sections.length}
          width={restrictedWidth}
          height={accordionSelectedBodyHeight}
        />
      </Group>
    );
  }
);

// <Rect
//   x={10}
//   y={10}
//   width={restrictedWidth}
//   height={50}
//   fill="#f0f0f0"
//   stroke="black"
//   strokeWidth={2}
// />
// {/* down arrow triangle */}
// <Line points={[30, 45, 40, 25, 20, 25]} closed fill="black" />
// <Text
//   x={60}
//   y={40}
//   text="Section 1"
//   fontFamily="Arial"
//   fontSize={20}
//   fill="black"
// />

// {/* Contenido de la sección 1 */}
// <Rect
//   x={10}
//   y={60}
//   width={restrictedWidth}
//   height={100}
//   fill="#ffffff"
//   stroke="black"
//   strokeWidth={1}
// />
// <Text
//   x={20}
//   y={90}
//   text="Content of section 1"
//   fontFamily="Arial"
//   fontSize={16}
//   fill="black"
// />

// {/* Sección 2: Colapsada */}
// <Rect
//   x={10}
//   y={160}
//   width={restrictedWidth}
//   height={50}
//   fill="#f0f0f0"
//   stroke="black"
//   strokeWidth={2}
// />
// {/* Right arrow triangle */}
// <Line points={[30, 175, 50, 185, 30, 195]} closed fill="black" />
// <Text
//   x={60}
//   y={180}
//   text="Section 2"
//   fontFamily="Arial"
//   fontSize={20}
//   fill="black"
// />
