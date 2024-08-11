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
