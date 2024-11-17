import { useEffect, useState } from 'react';
import { adjustTabWidths } from './business/tabsbar.business';
import {
  extractCSVHeaders,
  splitCSVContentIntoRows,
} from '@/common/utils/active-element-selector.utils';
import { useCanvasContext } from '@/core/providers';

interface TabListConfig {
  text: string;
  containerWidth: number;
  minTabWidth: number;
  tabXPadding: number;
  tabsGap: number;
  font: {
    fontSize: number;
    fontFamily: string;
  };
}

export const useTabList = (tabsConfig: TabListConfig) => {
  const { text, containerWidth, minTabWidth, tabXPadding, tabsGap, font } =
    tabsConfig;

  const [tabWidthList, setTabWidthList] = useState<{
    widthList: number[];
    relativeTabPosition: number[];
  }>({ widthList: [], relativeTabPosition: [] });

  const tabLabels = _extractTabLabelTexts(text);

  const konvaLayer = useCanvasContext().stageRef.current?.getLayers()[0];

  useEffect(() => {
    setTabWidthList(
      adjustTabWidths({
        tabs: tabLabels,
        containerWidth,
        minTabWidth,
        tabXPadding,
        tabsGap,
        font: {
          fontSize: font.fontSize,
          fontFamily: font.fontFamily,
        },
        konvaLayer,
      })
    );
  }, [text, containerWidth]);

  //Return an unique array with all the info required by each tab
  return tabLabels.map((tab, index) => ({
    tab,
    width: tabWidthList.widthList[index],
    xPos: tabWidthList.relativeTabPosition[index],
  }));
};

// Split text to tab labels List
function _extractTabLabelTexts(text: string) {
  const csvData = splitCSVContentIntoRows(text);
  const headers = extractCSVHeaders(csvData[0]);
  return headers.map(header => header.text);
}
