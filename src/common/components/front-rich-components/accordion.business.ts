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

// TODO: Add Unit tests
// case 1 if text is empty just show default sections
// case 2 if text has 1 section, then show 1 section and selectedSectionIndex = 0
// case 3 if text has 2 sections, and section to starts with [*] then show 2 sections and selectedSectionIndex = 1, and section with removed [*]
// case 4 if text has 2 sections, and no section to starts with [*] then show 2 sections and selectedSectionIndex = 0, and section with removed [*]
// ...
// If there are more than one section selected, pick the first one and remove the [*] from all of them
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
