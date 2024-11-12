export const calcTextWidth = (
  inputText: string,
  fontSize: number,
  fontfamily: string
) => {
  // Creates an invisible canvas to perform the measurement
  let canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (context) {
    context.font = `${fontSize}px ${fontfamily}`;
    return context.measureText(inputText).width;
  }
  const charAverageWidth = fontSize * 0.7;
  return inputText.length * charAverageWidth + charAverageWidth * 0.8;
};
