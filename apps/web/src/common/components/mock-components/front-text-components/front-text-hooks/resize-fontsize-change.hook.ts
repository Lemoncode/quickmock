import { calcTextDimensions } from '#common/utils/calc-text-dimensions';
import { useCanvasContext } from '#core/providers';
import { useEffect, useRef } from 'react';

export interface MultipleItemsInfo {
  numberOfItems: number;
  horizontalSpacing: number;
}

export const useResizeOnFontSizeChange = (
  id: string,
  coords: { x: number; y: number },
  text: string,
  fontSize: number,
  fontVariant: string,
  multiline: boolean = false,
  multipleItemsInfo?: MultipleItemsInfo // Just in case we have a list of items (horizontally), e.g horizontal menu
) => {
  const previousFontSize = useRef(fontSize);
  const { updateShapeSizeAndPosition, stageRef } = useCanvasContext();
  const konvaLayer = stageRef.current?.getLayers()[0];

  useEffect(() => {
    if (previousFontSize.current !== fontSize) {
      previousFontSize.current = fontSize;

      const paragraphLines = _extractParagraphLines(text);
      const longestLine = _findLongestString(paragraphLines);

      const { width: longestLineWidth, height: longestLineHeight } =
        calcTextDimensions(
          multiline ? longestLine : text,
          fontSize,
          fontVariant,
          konvaLayer
        );

      // We add to the longest line width the spacing between items if multiple items
      const width =
        longestLineWidth +
        (multipleItemsInfo
          ? multipleItemsInfo.horizontalSpacing *
            multipleItemsInfo.numberOfItems
          : 0);
      const height = longestLineHeight;

      updateShapeSizeAndPosition(
        id,
        coords,
        {
          width: width * 1.25,
          height: multiline
            ? _calcParagraphTotalHeight(height, 0.8, paragraphLines.length)
            : height,
        },
        true
      );
    }
  }, [fontSize]);
};

/* Hook Helper functions */
function _extractParagraphLines(multilineText: string) {
  return multilineText.split(/\r?\n/).filter(line => line.trim() !== '');
}

function _findLongestString(stringsArray: string[]): string {
  return stringsArray.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  );
}

function _calcParagraphTotalHeight(
  heightPerLine: number,
  lineHeight: number = 1.3,
  linesQty: number
) {
  return heightPerLine * lineHeight * linesQty;
}
