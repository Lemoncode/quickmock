import { forwardRef, useMemo } from 'react';
import { Group, Path, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../shape.model';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';
import {
  getOffsetFromId,
  phrase,
  rounded,
  seededRandom,
} from './text-scribbled.business';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';

const textScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 80,
  maxWidth: 1000,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 80,
};

export const getTextScribbledShapeRestrictions = (): ShapeSizeRestrictions =>
  textScribbledShapeRestrictions;

const shapeType: ShapeType = 'textScribbled';

export const TextScribbled = forwardRef<any, ShapeProps>((props, ref) => {
  const { width, height, id, otherProps, ...shapeProps } = props;

  const { stroke } = useShapeProps(otherProps, BASIC_SHAPE);
  const commonGroupProps = useGroupShapeProps(
    props,
    { width, height },
    shapeType,
    ref
  );

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    textScribbledShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const pathData = useMemo(() => {
    const width = restrictedWidth;
    const height = restrictedHeight;
    console.log('** Width', restrictedWidth);

    const amplitude = height / 3;
    const avgCharWidth = 10;
    const spaceWidth = avgCharWidth * 1.5;
    const maxChars = Math.min(100, Math.floor(width / avgCharWidth));

    const offset = getOffsetFromId(id ?? '', phrase.length);
    const visibleText = phrase.slice(offset, offset + maxChars);

    const path: string[] = [];
    let currentX = 0;
    path.push(`M ${currentX},${height / 2}`);

    for (let i = 0; i < visibleText.length; i++) {
      const char = visibleText[i];
      const charWidth = avgCharWidth;
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
        currentX += spaceWidth;
        path.push(`M ${currentX},${height / 2}`);
      }

      if (currentX > width) break;
    }

    return path.join(' ');
  }, [width]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Had to add a rectangle to allow drag / drop movement*/}
      <Rect
        width={restrictedSize.width}
        height={restrictedSize.height}
        stroke={stroke}
        strokeWidth={0}
      />
      <Path
        data={pathData}
        stroke={stroke}
        strokeWidth={3}
        lineCap="round"
        lineJoin="round"
      />
    </Group>
  );
});

/*
      <RectangleShape
        x={0}
        y={0}
        width={width}
        height={height}
        stroke={stroke}
        strokeWidth={6}
        fill="white"
      ></RectangleShape>
*/
