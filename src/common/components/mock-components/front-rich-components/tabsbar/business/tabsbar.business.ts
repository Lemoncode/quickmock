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
}) => {
  const { tabs, containerWidth, minTabWidth, tabXPadding, tabsGap, font } =
    args;
  const totalInnerXPadding = tabXPadding * 2;
  const totalMinTabSpace = minTabWidth + totalInnerXPadding;
  const containerWidthWithoutTabGaps =
    containerWidth - (tabs.length - 1) * tabsGap;

  //Create info Object with originalPositions and desired width
  interface OriginalTabInfo {
    initialTabPosition: number;
    desiredWidth: number;
  }
  const arrangeTabsInfo = tabs.reduce(
    (acc: OriginalTabInfo[], tab, index): OriginalTabInfo[] => {
      const tabFullTextWidth =
        calcTextWidth(tab, font.fontSize, font.fontFamily) + totalInnerXPadding;
      const desiredWidth = Math.max(totalMinTabSpace, tabFullTextWidth);
      return [
        ...acc,
        {
          initialTabPosition: index,
          desiredWidth,
        },
      ];
    },
    []
  );

  // This order is neccessary to build layer by layer the new sizes
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
      newList[current.initialTabPosition] = adjustedSizeList[index];
      return newList;
    },
    []
  );

  // Calc item offset position
  let sumOfXposition = 0;
  const relativeTabPosition = reassembledData.reduce(
    (acc: number[], el, index) => {
      const currentElementXPos = index ? sumOfXposition : 0;
      sumOfXposition += el + tabsGap;
      return [...acc, currentElementXPos];
    },
    []
  );

  return { widthList: reassembledData, relativeTabPosition };
};
