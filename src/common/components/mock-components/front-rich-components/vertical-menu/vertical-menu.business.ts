import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

interface VerticalMenuItemsInfo {
  options: string[];
  selectedItemIndex: number;
}

interface SizeInfo {
  width: number;
  height: number;
  singleHeaderHeight: number;
  verticalMenuShapeSizeRestrictions: ShapeSizeRestrictions;
}

export const calculateDynamicContentSizeRestriction = (
  options: string[],
  sizeInfo: SizeInfo
) => {
  const {
    width,
    height,
    singleHeaderHeight,
    verticalMenuShapeSizeRestrictions,
  } = sizeInfo;

  // listbox Item height:
  const verticalMenuHeadersHeight = singleHeaderHeight * options.length;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    verticalMenuShapeSizeRestrictions,
    width,
    height
  );
  restrictedSize.height = verticalMenuHeadersHeight;

  return restrictedSize;
};

export const mapTextToOptions = (text: string): VerticalMenuItemsInfo => {
  let options: string[] = text.split('\n');

  const selectedItemIndex = options.findIndex(option =>
    option.startsWith('----')
  );

  return {
    options,
    selectedItemIndex: selectedItemIndex === -1 ? 0 : selectedItemIndex,
  };
};
