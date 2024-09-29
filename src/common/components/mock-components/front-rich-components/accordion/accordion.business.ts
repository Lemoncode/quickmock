import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeSizeRestrictions } from '@/core/model';

interface SizeInfo {
  width: number;
  height: number;
  singleHeaderHeight: number;
  accordionShapeSizeRestrictions: ShapeSizeRestrictions;
  accordionSelectedBodyHeight: number;
}

export const calculateDynamicContentSizeRestriction = (
  sections: string[],
  sizeInfo: SizeInfo
) => {
  const {
    width,
    height,
    singleHeaderHeight,
    accordionShapeSizeRestrictions,
    accordionSelectedBodyHeight,
  } = sizeInfo;

  // Accordion section height:
  const accordionsHeadersHeight = singleHeaderHeight * sections.length;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    accordionShapeSizeRestrictions,
    width,
    height
  );

  restrictedSize.height = accordionsHeadersHeight + accordionSelectedBodyHeight;

  return restrictedSize;
};

interface SectionsInfo {
  sections: string[];
  selectedSectionIndex: number;
}

export const mapTextToSections = (text: string): SectionsInfo => {
  if (!text) {
    return {
      sections: ['Section A', 'Section B'],
      selectedSectionIndex: 0,
    };
  }

  let sections: string[] = text.split('\n');

  const selectedSectionIndex = sections.findIndex(section =>
    section.startsWith('[*]')
  );

  sections = sections.map(section => section.replace(/^\[\*\]/, ''));

  return {
    sections,
    selectedSectionIndex:
      selectedSectionIndex === -1 ? 0 : selectedSectionIndex,
  };
};

// TODO: Add unit tests
interface SelectedAccordionSizeInfo {
  height: number;
  minimumAccordionBodyHeight: number;
  singleHeaderHeight: number;
}

export const calculateSelectedAccordionHeight = (
  sections: string[],
  sizeInfo: SelectedAccordionSizeInfo
) => {
  const { height, minimumAccordionBodyHeight, singleHeaderHeight } = sizeInfo;

  const accordionsHeadersHeight = singleHeaderHeight * sections.length;
  let accordionSelectedBodyHeight = height - accordionsHeadersHeight;

  if (accordionSelectedBodyHeight < 0) {
    accordionSelectedBodyHeight = minimumAccordionBodyHeight;
  }

  return accordionSelectedBodyHeight;
};
