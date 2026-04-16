import { calculatePath } from '../text-scribbled-shape/text-scribbled.business';
import { MIN_LINE_HEIGHT } from './paragraph-scribbled.const';

export const calculateParagraphPaths = (
  restrictedWidth: number,
  restrictedHeight: number,
  id: string
): string[] => {
  // Calculate how many lines fit based on the height
  const numLines = Math.max(1, Math.trunc(restrictedHeight / MIN_LINE_HEIGHT));

  return Array.from({ length: numLines }).map((_, i) => {
    const lineY = i * MIN_LINE_HEIGHT;
    const lineId = `${id}-${i}`;
    const rawPath = calculatePath(restrictedWidth, MIN_LINE_HEIGHT, lineId);

    // Adjust the path to shift Y coordinate for each line
    // 🔍 Step by step:
    // The path assumes the text is vertically centered in a block of given height (e.g., 25px).
    // If you just drew this path multiple times, all lines would overlap.
    // To fix that, we shift the Y coordinate for each point in the path.
    //
    // Regular expression: /\d+,\d+/g
    // Finds all x,y coordinates in the path string (e.g., "10,12", "15,11").
    // We split each coordinate, convert y to number, add vertical offset (lineY),
    // then reassemble the coordinate string.
    const shiftedPath = rawPath.replace(/\d+,\d+/g, match => {
      const [xStr, yStr] = match.split(',');
      const x = parseFloat(xStr);
      const y = parseFloat(yStr) + lineY;
      return `${x},${y}`;
    });

    return shiftedPath;
  });
};
