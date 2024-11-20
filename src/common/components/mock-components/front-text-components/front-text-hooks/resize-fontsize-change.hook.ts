import { calcTextDimensions } from '@/common/utils/calc-text-dimensions';
import { useCanvasContext } from '@/core/providers';
import { useEffect, useRef } from 'react';

export const useResizeOnFontSizeChange = (
  id: string,
  coords: { x: number; y: number },
  text: string,
  fontSize: number,
  fontVariant: string
) => {
  const previousFontSize = useRef(fontSize);
  const { updateShapeSizeAndPosition, stageRef } = useCanvasContext();
  const konvaLayer = stageRef.current?.getLayers()[0];

  useEffect(() => {
    if (previousFontSize.current != fontSize) {
      previousFontSize.current = fontSize;
      const { width, height } = calcTextDimensions(
        text,
        fontSize,
        fontVariant,
        konvaLayer
      );
      updateShapeSizeAndPosition(
        id,
        coords,
        { width: width * 1.15, height },
        true
      );
    }
  }, [fontSize]);
};
