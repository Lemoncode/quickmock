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

  const isOn = useMemo(
    () => otherProps?.checked ?? true,
    [otherProps?.checked]
  );

  const progress = useMemo(() => {
    const prog = otherProps?.progress ?? 50;
    return typeof prog === 'string' ? parseFloat(prog) : prog;
  }, [otherProps?.progress]);

  return {
    stroke,
    fill,
    textColor,
    strokeStyle,
    borderRadius,
    isOn,
    progress,
  };
};
