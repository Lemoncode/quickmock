import { OtherProps } from '@/core/model';
import { useMemo } from 'react';
import { DefaultStyleShape } from '../mock-components/front-components/shape.const';

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

  const isPlaceholder = useMemo(
    () => otherProps?.isPlaceholder ?? true,
    [otherProps?.isPlaceholder]
  );

  const isPassword = useMemo(
    () => otherProps?.isPassword ?? true,
    [otherProps?.isPassword]
  );

  const fontVariant = useMemo(
    () => otherProps?.fontVariant ?? defaultStyleShape.DEFAULT_FONT_VARIANT,
    [otherProps?.fontVariant]
  );

  const fontStyle = useMemo(
    () => otherProps?.fontStyle ?? defaultStyleShape.DEFAULT_FONT_STYLE,
    [otherProps?.fontStyle]
  );

  const fontSize = useMemo(
    () => otherProps?.fontSize ?? defaultStyleShape.DEFAULT_FONT_SIZE,
    [otherProps?.fontSize]
  );

  const textDecoration = useMemo(
    () =>
      otherProps?.textDecoration ?? defaultStyleShape.DEFAULT_TEXT_DECORATION,
    [otherProps?.textDecoration]
  );

  const textAlignment = useMemo(
    () => otherProps?.textAlignment ?? defaultStyleShape.DEFAULT_TEXT_ALIGNMENT,
    [otherProps?.textAlignment]
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

  const selectedBackgroundColor = useMemo(
    () => otherProps?.selectedBackgroundColor ?? '#add8e6',
    [otherProps?.selectedBackgroundColor]
  );

  const disabled = useMemo(
    () => otherProps?.disabled ?? defaultStyleShape.DEFAULT_DISABLED,
    [otherProps?.disabled]
  );

  return {
    stroke,
    fill,
    textColor,
    strokeStyle,
    borderRadius,
    isOn,
    progress,
    selectedBackgroundColor,
    fontVariant,
    fontStyle,
    fontSize,
    textDecoration,
    textAlignment,
    disabled,
    isPlaceholder,
    isPassword,
  };
};
