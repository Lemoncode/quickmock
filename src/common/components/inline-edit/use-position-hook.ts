import { useCallback } from 'react';
import { addPxSuffix, calculateCoordinateValue } from './inline-edit.utils';
import { Coord, Size } from '@/core/model';

export const usePositionHook = (coords: Coord, size: Size, scale: number) => {
  // TODO: this can be optimized using React.useCallback, issue #90
  // https://github.com/Lemoncode/quickmock/issues/90
  const calculateTextAreaXPosition = useCallback(
    () => calculateCoordinateValue(coords.x, scale),
    [coords.x, scale]
  );
  const calculateTextAreaYPosition = useCallback(
    () => calculateCoordinateValue(coords.y, scale),
    [coords.y, scale]
  );
  const calculateWidth = useCallback(
    () => addPxSuffix(size.width),
    [size.width]
  );
  const calculateHeight = useCallback(
    () => addPxSuffix(size.height),
    [size.height]
  );

  return {
    calculateTextAreaXPosition,
    calculateTextAreaYPosition,
    calculateWidth,
    calculateHeight,
  };
};
