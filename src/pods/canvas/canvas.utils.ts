import { getComboBoxShapeSizeRestrictions } from "@/common/components/shapes";
import { ShapeSizeRestrictions, ShapeType } from "@/core/model";

// TODO: this should be moved common and unit tests added
export function getDecimalPart(num: number): number {
  // Get intenger part
  const integerPart = Math.trunc(num);
  // Substract integer to num obtain decimal part
  const decimalPart = num - integerPart;
  return decimalPart;
}

export const fitBoxToShapeSizeRestrictions = (
  shapeSizeRestrictions: ShapeSizeRestrictions,
  width: number,
  height: number
): { width: number; height: number } => {
  const newWidth =
    shapeSizeRestrictions.maxWidth !== -1
      ? Math.min(shapeSizeRestrictions.maxWidth, width)
      : width;
  const newHeight =
    shapeSizeRestrictions.maxHeight !== -1
      ? Math.min(shapeSizeRestrictions.maxHeight, height)
      : height;

  return {
    width: Math.max(shapeSizeRestrictions.minWidth, newWidth),
    height: Math.max(shapeSizeRestrictions.minHeight, newHeight),
  };
};

const defaultShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 0,
  minHeight: 0,
  maxWidth: -1,
  maxHeight: -1,
};

export const getShapeSizeRestrictions = (
  type: ShapeType | null
): ShapeSizeRestrictions => {
  if (!type) return defaultShapeSizeRestrictions;

  switch (type) {
    case "combobox":
      return getComboBoxShapeSizeRestrictions();
  }
};
