import { calcTextDimensions } from '@/common/utils/calc-text-dimensions';
import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef } from 'react';

export const useResizeOnFontSizeChange = (
  id: string,
  coords: { x: number; y: number },
  text: string,
  fontSize: number,
  fontVariant: string,
  multiline: boolean = false
) => {
  const previousFontSize = useRef(fontSize);
  const { updateShapeSizeAndPosition, stageRef } = useCanvasContext();
  const konvaLayer = stageRef.current?.getLayers()[0];

  useEffect(() => {
    if (previousFontSize.current !== fontSize) {
      previousFontSize.current = fontSize;

      const paragraphLines = _extractParagraphLines(text);
      const longestLine = _findLongestString(paragraphLines);

      const { width, height } = calcTextDimensions(
        multiline ? longestLine : text,
        fontSize,
        fontVariant,
        konvaLayer
      );

      updateShapeSizeAndPosition(
        id,
        coords,
        {
          width: width * 1.15,
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
