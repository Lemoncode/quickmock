import { AVG_CHAR_WIDTH, SPACE_WIDTH } from './text-scribbled.model';

export const phrase =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ' +
  'Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. ' +
  'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. ' +
  'Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra. ' +
  'Per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. ' +
  'Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. ' +
  'Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa.';

export const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

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

export const checkIfSpaceAndAddToPath = (
  path: string[],
  char: string,
  height: number,
  currentX: number,
  spaceWidth: number
) => {
  if (char === ' ') {
    currentX += spaceWidth;
    path.push(`M ${currentX},${height / 2}`);
  }
};

export const calculatePath = (width: number, height: number, id: string) => {
  const amplitude = height / 3;

  const maxChars = Math.min(100, Math.floor(width / AVG_CHAR_WIDTH));

  const offset = getOffsetFromId(id ?? '', phrase.length);
  const visibleText = phrase.slice(offset, offset + maxChars);

  const path: string[] = [];
  let currentX = 0;
  path.push(`M ${currentX},${height / 2}`);

  for (let i = 0; i < visibleText.length; i++) {
    const char = visibleText[i];
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

    path.push(
      `C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`
    );

    currentX = endX;

    if (char === ' ') {
      currentX += SPACE_WIDTH;
      path.push(`M ${currentX},${height / 2}`);
    }

    if (currentX > width) break;
  }

  return path.join(' ');
};
