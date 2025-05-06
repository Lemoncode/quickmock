import { forwardRef, useMemo } from 'react';
import { Group, Path, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../../shape.model';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useGroupShapeProps } from '../../mock-components.utils';
import { calculatePath } from '../text-scribbled-shape/text-scribbled.business';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';

const MIN_LINE_HEIGHT = 25;

const paragraphScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: MIN_LINE_HEIGHT,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 150,
};

export const getParagraphScribbledShapeRestrictions =
  (): ShapeSizeRestrictions => paragraphScribbledShapeRestrictions;

const shapeType: ShapeType = 'paragraphScribbled';

export const ParagraphScribbled = forwardRef<any, ShapeProps>((props, ref) => {
  const { width, height, id, otherProps, ...shapeProps } = props;

  const { stroke } = useShapeProps(otherProps, BASIC_SHAPE);
  const commonGroupProps = useGroupShapeProps(
    props,
    { width, height },
    shapeType,
    ref
  );

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    paragraphScribbledShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  // Calculate how many lines fit based on the height
  const numLines = Math.max(1, Math.trunc(restrictedHeight / MIN_LINE_HEIGHT));

  // Generate one path per line
  const paths = useMemo(() => {
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
  }, [restrictedWidth, restrictedHeight, id]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {paths.map((path, idx) => (
        <Path
          key={idx}
          data={path}
          stroke={stroke}
          strokeWidth={3}
          lineCap="round"
          lineJoin="round"
        />
      ))}
      <Rect
        width={restrictedSize.width}
        height={restrictedSize.height}
        stroke={stroke}
        strokeWidth={0}
      />
    </Group>
  );
});
