import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

interface ListBoxItemsInfo {
  items: string[];
  selectedItemIndex: number;
}

interface SizeInfo {
  width: number;
  height: number;
  singleHeaderHeight: number;
  listboxShapeSizeRestrictions: ShapeSizeRestrictions;
}

export const calculateDynamicContentSizeRestriction = (
  items: string[],
  sizeInfo: SizeInfo
) => {
  const { width, height, singleHeaderHeight, listboxShapeSizeRestrictions } =
    sizeInfo;

  // listbox Item height:
  const listboxHeadersHeight = singleHeaderHeight * items.length;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    listboxShapeSizeRestrictions,
    width,
    height
  );
  restrictedSize.height = listboxHeadersHeight;

  return restrictedSize;
};

export const mapListboxTextToItems = (text: string): ListBoxItemsInfo => {
  let items: string[] = text.split('\n');

  const selectedItemIndex = items.findIndex(item => item.startsWith('[*]'));

  items = items.map(item => item.replace(/^\[\*\]/, ''));
  items = items.filter(item => item !== '');

  return {
    items: items,
    selectedItemIndex: selectedItemIndex === -1 ? 0 : selectedItemIndex,
  };
};
