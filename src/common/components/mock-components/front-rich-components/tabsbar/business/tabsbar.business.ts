import { Layer } from 'konva/lib/Layer';
import { balanceSpacePerItem } from './balance-space';
import { calcTextWidth } from './calc-text-width';

export const adjustTabWidths = (args: {
  tabs: string[];
  containerWidth: number;
  minTabWidth: number;
  tabXPadding: number;
  tabsGap: number;
  font: {
    fontSize: number;
    fontFamily: string;
  };
  konvaLayer?: Layer;
}) => {
  const {
    tabs,
    containerWidth,
    minTabWidth,
    tabXPadding,
    tabsGap,
    font,
    konvaLayer,
  } = args;
  const totalInnerXPadding = tabXPadding * 2;
  const totalMinTabSpace = minTabWidth + totalInnerXPadding;
  const containerWidthWithoutTabGaps =
    containerWidth - (tabs.length - 1) * tabsGap;

  //Create info List with originalPositions and desired width
  interface OriginalTabInfo {
    originalTabPosition: number;
    desiredWidth: number;
  }
  const arrangeTabsInfo = tabs.reduce(
    (acc: OriginalTabInfo[], tab, index): OriginalTabInfo[] => {
      const tabFullTextWidth =
        calcTextWidth(tab, font.fontSize, font.fontFamily, konvaLayer) +
        totalInnerXPadding;
      const desiredWidth = Math.max(totalMinTabSpace, tabFullTextWidth);
      return [
        ...acc,
        {
          originalTabPosition: index,
          desiredWidth,
        },
      ];
    },
    []
  );

  // This order is necessary to build layer by layer the new sizes
  const ascendentTabList = arrangeTabsInfo.sort(
    (a, b) => a.desiredWidth - b.desiredWidth
  );

  const onlyWidthList = ascendentTabList.map(tab => tab.desiredWidth);
  // Apply adjustments
  const adjustedSizeList = balanceSpacePerItem(
    onlyWidthList,
    containerWidthWithoutTabGaps
  );

  // Reassemble new data with the original order
  const reassembledData = ascendentTabList.reduce(
    (accList: number[], current, index) => {
      const newList = [...accList];
      newList[current.originalTabPosition] = adjustedSizeList[index];
      return newList;
    },
    []
  );

  // Calc item offset position (mixed with external variable to avoid adding to reducer() extra complexity)
  let sumOfXposition = 0;
  const relativeTabPosition = reassembledData.reduce(
    (acc: number[], currentTab, index) => {
      const currentElementXPos = index ? sumOfXposition : 0;
      sumOfXposition += currentTab + tabsGap;
      return [...acc, currentElementXPos];
    },
    []
  );

  return { widthList: reassembledData, relativeTabPosition };
};
