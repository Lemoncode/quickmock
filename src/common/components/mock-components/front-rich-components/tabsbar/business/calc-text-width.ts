export const calcTextWidth = (
  inputText: string,
  fontSize: number,
  _fontfamily: string
) => {
  const charAverageWidth = fontSize * 0.5;
  return inputText.length * charAverageWidth + charAverageWidth / 2;
};
