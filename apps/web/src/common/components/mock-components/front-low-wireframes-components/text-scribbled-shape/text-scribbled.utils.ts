import { AVG_CHAR_WIDTH, SPACE_WIDTH } from './text-scribbled.const';

export const seededRandom = (seed: number) => {
  // Let's get a random value in between -1 and 1
  // And let's multiply it by 10000 to get a bigger number (more precision)
  const x = Math.sin(seed) * 10000;

  // Le's extract the decimal part of the number
  // a number in between 0 and 1
  return x - Math.floor(x);
};

// We need to add some random offset to start the text at a different position
// BUT we cannot use here just a random number because it will change every time
// the component is re-rendered, so we need to use a deterministic way to get the offset
// based on the Id of the shape
// 👇 Based on the Id deterministic offset
// a bit weird, maybe just a random useEffect []
export const getOffsetFromId = (id: string, max: number) => {
  let sum = 0;
  for (let i = 0; i < id.length; i++) {
    sum += id.charCodeAt(i);
  }
  return sum % max;
};

export const rounded = (value: number) => Math.round(value * 2) / 2;

export const addBlankSpaceToPath = (
  currentX: number,
  maxWidth: number,
  height: number
) => {
  currentX += SPACE_WIDTH;

  // We don't want to go out of the area, if not transformer won't work well
  const adjustedEndX = Math.min(currentX, maxWidth - 1);

  return {
    pathSlice: `M ${adjustedEndX},${Math.trunc(height / 2)}`,
    newCurrentX: currentX,
  };
};

export const drawCharScribble = (
  char: string,
  i: number,
  currentX: number,
  maxWidth: number,
  height: number
) => {
  // Max Y variation on the scribble
  const amplitude = height / 3;
  const charWidth = AVG_CHAR_WIDTH;
  // Let's generate a psuedo-random number based on the char and the index
  const seed = char.charCodeAt(0) + i * 31;

  const controlX1 = currentX + charWidth / 2;
  const controlY1 = Math.trunc(
    rounded(
      // Generate a pseudo random number between -amplitude and amplitude
      height / 2 + (seededRandom(seed) * amplitude - amplitude / 2)
    )
  );

  const controlX2 = currentX + charWidth;
  const controlY2 = Math.trunc(
    rounded(height / 2 + (seededRandom(seed + 1) * amplitude - amplitude / 2))
  );

  // Let's truc it to avoid edge cases with the max
  const endX = Math.trunc(currentX + charWidth);
  const endY = Math.trunc(height / 2);

  // We don't want to go out of the area, if not transformer won't work well
  const adjustedEndX = Math.min(endX, maxWidth - 1);

  return {
    pathSegment: `C ${controlX1},${controlY1} ${controlX2},${controlY2} ${adjustedEndX},${endY}`,
    endX,
  };
};
