import { Group } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { ShapeProps } from '../../front-components/shape.model';
import { AccordionAllParts } from './components';
import {
  calculateDynamicContentSizeRestriction,
  calculateSelectedAccordionHeight,
  mapTextToSections,
} from './accordion.business';

const accordionShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 315,
  minHeight: 225,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 315,
  defaultHeight: 250,
};

export const getAccordionShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  accordionShapeSizeRestrictions;

const singleHeaderHeight = 50;
const minimumAccordionBodyHeight = 60;

export const AccordionShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, text, ...shapeProps }, ref) => {
    const [sections, setSections] = useState<string[]>([
      '[*] Sectión A',
      'Sectión B',
    ]);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);

    useEffect(() => {
      if (text) {
        const { sections, selectedSectionIndex } = mapTextToSections(text);
        setSections(sections);
        setSelectedSectionIndex(selectedSectionIndex);
      } else {
        setSections([]);
      }
    }, [text]);

    const accordionSelectedBodyHeight = useMemo(() => {
      return calculateSelectedAccordionHeight(sections, {
        height,
        minimumAccordionBodyHeight,
        singleHeaderHeight,
      });
    }, [sections, height]);

    const { width: restrictedWidth, height: restrictedHeight } =
      calculateDynamicContentSizeRestriction(sections, {
        width,
        height,
        singleHeaderHeight,
        accordionShapeSizeRestrictions,
        accordionSelectedBodyHeight,
      });

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
        <AccordionAllParts
          width={restrictedWidth}
          singleHeaderHeight={singleHeaderHeight}
          accordionSelectedBodyHeight={accordionSelectedBodyHeight}
          sections={sections}
          selectedSectionIndex={selectedSectionIndex}
        />
      </Group>
    );
  }
);
