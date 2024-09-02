import { OtherProps } from '@/core/model';
import { useMemo } from 'react';
import { INPUT_SHAPE } from '../front-components/shape.const';

export const useShapeProperties = (otherProps: OtherProps | undefined) => {
  const stroke = useMemo(
    () => otherProps?.stroke ?? 'black',
    [otherProps?.stroke]
  );

  const fill = useMemo(
    () => otherProps?.backgroundColor ?? 'white',
    [otherProps?.backgroundColor]
  );

  const textColor = useMemo(
    () => otherProps?.textColor ?? 'black',
    [otherProps?.textColor]
  );

  const strokeStyle = useMemo(
    () => otherProps?.strokeStyle ?? [],
    [otherProps?.strokeStyle]
  );

  const borderRadius = useMemo(() => {
    const radius = Number(otherProps?.borderRadius);
    return isNaN(radius) ? INPUT_SHAPE.DEFAULT_CORNER_RADIUS : radius;
  }, [otherProps?.borderRadius]);

  const isOn = useMemo(
    () => otherProps?.checked ?? true,
    [otherProps?.checked]
  );

  return {
    stroke,
    fill,
    textColor,
    strokeStyle,
    borderRadius,
    isOn,
  };
};
