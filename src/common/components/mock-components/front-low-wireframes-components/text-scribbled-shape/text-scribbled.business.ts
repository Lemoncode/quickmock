import {
  AVG_CHAR_WIDTH,
  SEED_PHRASE,
  SPACE_WIDTH,
} from './text-scribbled.const';

export const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
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

export const addBlankSpaceToPath = (currentX: number, height: number) => {
  currentX += SPACE_WIDTH;
  return {
    pathSlice: `M ${currentX},${height / 2}`,
    newCurrentX: currentX,
  };
};

const drawCharScribble = (
  char: string,
  i: number,
  currentX: number,
  height: number
) => {
  const amplitude = height / 3;
  const charWidth = AVG_CHAR_WIDTH;
  const seed = char.charCodeAt(0) + i * 31;

  const controlX1 = currentX + charWidth / 2;
  const controlY1 = rounded(
    height / 2 + (seededRandom(seed) * amplitude - amplitude / 2)
  );

  const controlX2 = currentX + charWidth;
  const controlY2 = rounded(
    height / 2 + (seededRandom(seed + 1) * amplitude - amplitude / 2)
  );

  const endX = currentX + charWidth;
  const endY = height / 2;

  return {
    pathSegment: `C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`,
    endX,
  };
};

export const calculatePath = (width: number, height: number, id: string) => {
  // This AVG_CHAR_WIDTH is a rough approximation of the average character width
  // It could lead us to issues
  const offset = getOffsetFromId(id ?? '', MAX_START_OFFSET);

  // In the past it was: /*offset + maxChars*/
  // but just updated to SEED_PHRASE.length to ensure we have enough cahrs despite
  // the average offset (the loop will break if we run out of space)
  const visibleText = SEED_PHRASE.slice(offset, SEED_PHRASE.length);

  const path: string[] = [];
  let currentX = 0;
  path.push(`M ${currentX},${height / 2}`);

  for (let i = 0; i < visibleText.length; i++) {
    const char = visibleText[i];

    const { pathSegment, endX } = drawCharScribble(char, i, currentX, height);
    path.push(pathSegment);
    currentX = endX;

    // If it's a space, we need to add a blank space to the path
    if (char === ' ') {
      const { pathSlice, newCurrentX } = addBlankSpaceToPath(currentX, height);
      path.push(pathSlice);
      currentX = newCurrentX;
    }

    // If we run out of space, we break the loop
    if (currentX > width) break;
  }

  return path.join(' ');
};
