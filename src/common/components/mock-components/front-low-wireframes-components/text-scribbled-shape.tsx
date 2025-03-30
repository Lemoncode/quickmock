import { forwardRef } from 'react';
import { Group, Path } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { ShapeProps } from '../shape.model';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../front-components/shape.const';
import { useGroupShapeProps } from '../mock-components.utils';

const textScribbledShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 100,
  minHeight: 20,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 300,
  defaultHeight: 100,
};

export const getTextScribbledShapeRestrictions = (): ShapeSizeRestrictions =>
  textScribbledShapeRestrictions;

const shapeType: ShapeType = 'textScribbled';

export const TextScribbled = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, otherProps, ...shapeProps } =
    props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    textScribbledShapeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { stroke } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const phrase =
    'One ring to rule them all, one ring to find them, One ring to bring them all, and in the darkness bind them; In the Land of Mordor where the shadows lie';

  // Generate a scribbled path for the phrase
  const generateScribbledPath = () => {
    const path = [];
    const amplitude = restrictedHeight / 3; // Amplitude for ups and downs
    const frequency = 10; // Number of ups and downs per word
    const words = phrase.split(' '); // Split the phrase into words
    const wordSpacing = restrictedWidth / words.length; // Approximate spacing per word
    let currentX = 0;

    path.push(`M ${currentX},${restrictedHeight / 2}`); // Move to starting point

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const wordWidth = wordSpacing * word.length; // Approximate width of the word

      for (let j = 0; j < word.length; j++) {
        const controlX1 = currentX + wordWidth / (frequency * 2);
        const controlY1 =
          restrictedHeight / 2 + Math.random() * amplitude - amplitude / 2;

        const controlX2 = currentX + wordWidth / frequency;
        const controlY2 =
          restrictedHeight / 2 + Math.random() * amplitude - amplitude / 2;

        const endX = currentX + wordWidth / frequency;
        const endY = restrictedHeight / 2;

        path.push(
          `C ${controlX1},${controlY1} ${controlX2},${controlY2} ${endX},${endY}`
        );
        currentX = endX;
      }

      // Add space between words
      currentX += wordSpacing; // Add spacing for the word gap

      // Stop if the scribble exceeds the component's width
      if (currentX > restrictedWidth) {
        break;
      }

      // Add a small gap to simulate spaces
      path.push(`M ${currentX},${restrictedHeight / 2}`);
    }

    return path.join(' ');
  };

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Scribbled effect */}
      <Path
        data={generateScribbledPath()}
        stroke={stroke}
        strokeWidth={3} // Thicker stroke for better visibility
        lineCap="round"
        lineJoin="round"
      />
    </Group>
  );
});
