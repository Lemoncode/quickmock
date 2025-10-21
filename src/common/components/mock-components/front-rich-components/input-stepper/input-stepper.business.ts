export const getTextFieldWidth = (restrictedWidth: number): number => {
  const inputWidth = restrictedWidth * 0.3;
  const minInputWidth = 30;
  const maxInputWidth = 70;

  if (inputWidth < minInputWidth) {
    return minInputWidth;
  } else if (inputWidth > maxInputWidth) {
    return maxInputWidth;
  }

  return inputWidth;
};
