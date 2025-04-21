export const calculateShapeAdjustedDimensions = (
  strokeWidth: number,
  restrictedWidth: number,
  restrictedHeight: number
) => {
  const adjustedX = strokeWidth / 2;
  const adjustedY = strokeWidth / 2;
  const adjustedWidth = restrictedWidth - strokeWidth;
  const adjustedHeight = restrictedHeight - strokeWidth;

  return { adjustedX, adjustedY, adjustedWidth, adjustedHeight };
};
