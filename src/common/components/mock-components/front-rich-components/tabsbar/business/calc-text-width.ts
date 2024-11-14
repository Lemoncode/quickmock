import { Layer } from 'konva/lib/Layer';

/**
 * Virtually calculates the width that a text will occupy, by using a canvas.
 * If a Konva Layer is provided, it will reuse the already existing canvas.
 * Otherwise, it will create a canvas within the document, on the fly, to perform the measurement.
 * Finaly, as a safety net, a very generic calculation is provided in case the other options are not available.
 */
export const calcTextWidth = (
  inputText: string,
  fontSize: number,
  fontfamily: string,
  konvaLayer?: Layer
) => {
  if (konvaLayer)
    return _getTextWidthByKonvaMethod(
      konvaLayer,
      inputText,
      fontSize,
      fontfamily
    );

  return _getTextCreatingNewCanvas(inputText, fontSize, fontfamily);
};

const _getTextWidthByKonvaMethod = (
  konvaLayer: Layer,
  text: string,
  fontSize: number,
  fontfamily: string
) => {
  const context = konvaLayer.getContext();
  context.font = `${fontSize}px ${fontfamily}`;
  return context.measureText(text).width;
};

const _getTextCreatingNewCanvas = (
  text: string,
  fontSize: number,
  fontfamily: string
) => {
  let canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = `${fontSize}px ${fontfamily}`;
    return context.measureText(text).width;
  }
  const charAverageWidth = fontSize * 0.7;
  return text.length * charAverageWidth + charAverageWidth * 0.8;
};
