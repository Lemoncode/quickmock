import { Group } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { ShapeProps } from '../../front-components/shape.model';
import { AccordionAllParts } from './components';
import {
  calculateDynamicContentSizeRestriction,
  calculateSelectedAccordionHeight,
  mapTextToSections,
} from './accordion.business';
import { useGroupShapeProps } from '../../mock-components.utils';

const accordionShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 315,
  minHeight: 225,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 315,
  defaultHeight: 250,
};

const shapeType: ShapeType = 'accordion';

export const getAccordionShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  accordionShapeSizeRestrictions;

const singleHeaderHeight = 50;
const minimumAccordionBodyHeight = 60;

export const AccordionShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, text, ...shapeProps } = props;
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

  const restrictedSize = calculateDynamicContentSizeRestriction(sections, {
    width,
    height,
    singleHeaderHeight,
    accordionShapeSizeRestrictions,
    accordionSelectedBodyHeight,
  });
  const { width: restrictedWidth } = restrictedSize;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps} fill="black">
      <AccordionAllParts
        width={restrictedWidth}
        singleHeaderHeight={singleHeaderHeight}
        accordionSelectedBodyHeight={accordionSelectedBodyHeight}
        sections={sections}
        selectedSectionIndex={selectedSectionIndex}
      />
    </Group>
  );
});
