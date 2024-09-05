import { OtherProps } from '@/core/model';
import { useMemo } from 'react';
import { DefaultStyleShape } from '../front-components/shape.const';

export const useShapeProps = (
  otherProps: OtherProps | undefined,
  defaultStyleShape: DefaultStyleShape
) => {
  const stroke = useMemo(
    () => otherProps?.stroke ?? defaultStyleShape.DEFAULT_STROKE_COLOR,
    [otherProps?.stroke]
  );

  const fill = useMemo(
    () =>
      otherProps?.backgroundColor ?? defaultStyleShape.DEFAULT_FILL_BACKGROUND,
    [otherProps?.backgroundColor]
  );

  const textColor = useMemo(
    () => otherProps?.textColor ?? defaultStyleShape.DEFAULT_FILL_TEXT,
    [otherProps?.textColor]
  );

  const strokeStyle = useMemo(
    () => otherProps?.strokeStyle ?? [],
    [otherProps?.strokeStyle]
  );

  const borderRadius = useMemo(() => {
    const radius = Number(otherProps?.borderRadius);
    return isNaN(radius) ? defaultStyleShape.DEFAULT_CORNER_RADIUS : radius;
  }, [otherProps?.borderRadius]);

  return {
    stroke,
    fill,
    textColor,
    strokeStyle,
    borderRadius,
  };
};
