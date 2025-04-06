import {
  AVG_CHAR_WIDTH,
  SEED_PHRASE,
  SPACE_WIDTH,
} from './text-scribbled.const';

export const seededRandom = (seed: number) => {
  // Let's get a random value in between -1 and 1
  // And let's multiply it by 10000 to get a bigger number (more precision)
  const x = Math.sin(seed) * 10000;

  // Le's extract the decimal part of the number
  // a number in between 0 and 1
  return x - Math.floor(x);
};

// 30 characters is enough to get a good random offset phrase[X]
// in the past it was phrase.length, but that can lead to issues
// if the offset start at the end of the phrase then we can get a frozen text when we make it bigger.
const MAX_START_OFFSET = 30;

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

const drawCharScribble = (
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

export const calculatePath = (width: number, height: number, id: string) => {
  //console.log('** calculatePath', width, height, id);
  // This AVG_CHAR_WIDTH is a rough approximation of the average character width
  // It could lead us to issues
  const offset = getOffsetFromId(id ?? '', MAX_START_OFFSET);

  // In the past it was: /*offset + maxChars*/
  // but just updated to SEED_PHRASE.length to ensure we have enough cahrs despite
  // the average offset (the loop will break if we run out of space)
  const visibleText = SEED_PHRASE.slice(offset, SEED_PHRASE.length);

  const path: string[] = [];
  let currentX = 0;
  path.push(`M ${currentX},${Math.trunc(height / 2)}`);

  for (let i = 0; i < visibleText.length; i++) {
    const char = visibleText[i];

    if (char !== ' ') {
      // Draw the character scribble
      const { pathSegment, endX } = drawCharScribble(
        char,
        i,
        currentX,
        width,
        height
      );
      path.push(pathSegment);
      currentX = endX;
    } else {
      // If it's a space, we need to add a blank space to the path
      const { pathSlice, newCurrentX } = addBlankSpaceToPath(
        currentX,
        width,
        height
      );
      path.push(pathSlice);
      currentX = newCurrentX;
    }

    // If we run out of space, we break the loop
    // We need to add the AVG_CHAR_WIDTH to the equation to avoid
    // rending a scribble that could be outside of the area
    // and make the transformer not work well
    if (currentX + AVG_CHAR_WIDTH >= width) break;
  }

  const result = path.join(' ');
  console.log('** calculatePath result', result);

  return path.join(' ');
};
