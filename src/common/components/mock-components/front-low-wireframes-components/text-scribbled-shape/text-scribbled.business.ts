import {
  AVG_CHAR_WIDTH,
  MAX_START_OFFSET,
  SEED_PHRASE,
} from './text-scribbled.const';
import {
  addBlankSpaceToPath,
  drawCharScribble,
  getOffsetFromId,
} from './text-scribbled.utils';

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

  return path.join(' ');
};
