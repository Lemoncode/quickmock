import { forwardRef } from 'react';
import { Line, Rect, Path, Group } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
import { useShapeComponentSelection } from '@/common/components/shapes/use-shape-selection.hook';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const AudioPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 280,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 280,
  defaultHeight: 50,
};
const PROGRESSBAR_PROGRESS = 0.5;

export const getAudioPlayerShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  AudioPlayerShapeSizeRestrictions;

const shapeType: ShapeType = 'audioPlayer';

export const AudioPlayerShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;

  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      AudioPlayerShapeSizeRestrictions,
      width,
      height
    );

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  // Ratios for the elements in relation to the component
  const ratioX = width / restrictedWidth;
  const ratioY = height / restrictedHeight;

  // Margin between elements (can be adjusted)
  const marginX = 20 * ratioX;
  // Progress bar start and end positions
  const progressBarStartX = 115 * ratioX + marginX;
  const progressBarEndX = restrictedWidth - 47 * ratioX - marginX;
  const progressBarFullWidth = progressBarEndX - progressBarStartX;

  // Width and height of the progress bar
  const progressBarWidth = progressBarFullWidth * PROGRESSBAR_PROGRESS;
  const progressBarHeight = 5 * ratioY;

  const backButtonPoints = [
    26 * ratioX,
    20 * ratioY,
    21 * ratioX,
    25 * ratioY,
    26 * ratioX,
    30 * ratioY,
  ];

  const playButtonPoints = [
    63 * ratioX,
    20 * ratioY,
    72 * ratioX,
    25 * ratioY,
    63 * ratioX,
    30 * ratioY,
  ];

  const forwardButtonPoints = [
    100 * ratioX,
    20 * ratioY,
    105 * ratioX,
    25 * ratioY,
    100 * ratioX,
    30 * ratioY,
  ];

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      onClick={handleSelection}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
    >
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
      ></Rect>

      {/* Back Button */}
      <Line
        points={backButtonPoints}
        fill="black"
        stroke="black"
        strokeWidth={1}
        closed={true}
      />
      <Line
        points={[30 * ratioX, 20 * ratioY, 30 * ratioX, 30 * ratioY]}
        stroke="black"
        strokeWidth={1}
      />

      {/* Play Button */}
      <Line
        points={playButtonPoints}
        fill="black"
        stroke="black"
        strokeWidth={1}
        closed={true}
      />

      {/* Forward Button */}
      <Line
        points={forwardButtonPoints}
        fill="black"
        stroke="black"
        strokeWidth={1}
        closed={true}
      />
      <Line
        points={[95 * ratioX, 20 * ratioY, 95 * ratioX, 30 * ratioY]}
        stroke="black"
        strokeWidth={1}
      />

      {/* Progress Bar */}
      <Rect
        x={progressBarStartX}
        y={22.5 * ratioY}
        width={progressBarFullWidth}
        height={progressBarHeight}
        stroke="black"
        strokeWidth={1}
      />
      <Rect
        x={progressBarStartX}
        y={22.5 * ratioY}
        width={progressBarWidth}
        height={progressBarHeight}
        fill="black"
      />

      {/* Volume Button */}
      <Path
        data={`
            M${restrictedWidth - 47 * ratioX},${22.5 * ratioY}
            L${restrictedWidth - 42 * ratioX},${22.5 * ratioY}
            L${restrictedWidth - 37 * ratioX},${17.5 * ratioY}
            L${restrictedWidth - 37 * ratioX},${32.5 * ratioY}
            L${restrictedWidth - 42 * ratioX},${27.5 * ratioY}
            L${restrictedWidth - 47 * ratioX},${27.5 * ratioY} Z
          `}
        fill="black"
        stroke="black"
        strokeWidth={1}
      />
      <Path
        data={`
            M${restrictedWidth - 32 * ratioX},${20 * ratioY}
            Q${restrictedWidth - 27 * ratioX},${25 * ratioY},${restrictedWidth - 32 * ratioX},${30 * ratioY}
          `}
        stroke="black"
        strokeWidth={1}
      />
      <Path
        data={`
            M${restrictedWidth - 25 * ratioX},${17.5 * ratioY}
            Q${restrictedWidth - 18 * ratioX},${25 * ratioY},${restrictedWidth - 25 * ratioX},${32.5 * ratioY}
          `}
        stroke="black"
        strokeWidth={1}
      />
    </Group>
  );
});
