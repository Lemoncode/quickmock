import { Group, Rect, Circle, Line } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';

const videoPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoPlayerShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  videoPlayerShapeSizeRestrictions;

const shapeType: ShapeType = 'videoPlayer';

export const VideoPlayerShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      videoPlayerShapeSizeRestrictions,
      width,
      height
    );

  const margin = 10;
  const controlBarHeight = 30;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* videoplayer frame */}
      <Rect
        x={margin}
        y={margin}
        width={restrictedWidth - 2 * margin}
        height={restrictedHeight - 2 * margin}
        cornerRadius={10}
        stroke="black"
        strokeWidth={3}
        fill="white"
      />

      {/* control bar */}
      <Rect
        x={margin}
        y={restrictedHeight - margin - controlBarHeight}
        width={restrictedWidth - 2 * margin}
        height={controlBarHeight + 15}
        stroke="black"
        strokeWidth={3}
        fill="white"
      />

      {/* triangle button */}
      <Line
        points={[
          margin + 15,
          restrictedHeight - controlBarHeight - 5,
          margin + 35,
          restrictedHeight - controlBarHeight + 10,
          margin + 15,
          restrictedHeight - controlBarHeight + 25,
        ]}
        fill="black"
        closed={true}
      />

      {/* progressbar */}
      <Line
        points={[
          margin + 50,
          restrictedHeight - controlBarHeight + 10,
          restrictedWidth - 2 * margin - 80,
          restrictedHeight - controlBarHeight + 10,
        ]}
        stroke="black"
        strokeWidth={2}
      />

      {/* pointer prorgessbar */}
      <Circle
        x={margin + 50}
        y={restrictedHeight - controlBarHeight + 10}
        radius={5}
        fill="black"
      />

      {/* speaker */}
      <Group>
        <Line
          points={[
            restrictedWidth - 2 * margin - 70,
            restrictedHeight - controlBarHeight + 5,
            restrictedWidth - 2 * margin - 65,
            restrictedHeight - controlBarHeight + 5,
            restrictedWidth - 2 * margin - 60,
            restrictedHeight - controlBarHeight,
            restrictedWidth - 2 * margin - 60,
            restrictedHeight - controlBarHeight + 20,
            restrictedWidth - 2 * margin - 65,
            restrictedHeight - controlBarHeight + 15,
            restrictedWidth - 2 * margin - 70,
            restrictedHeight - controlBarHeight + 15,
            restrictedWidth - 2 * margin - 70,
            restrictedHeight - controlBarHeight + 5,
          ]}
          stroke="black"
          strokeWidth={2}
          closed={true}
        />
        <Line
          points={[
            restrictedWidth - 2 * margin - 60,
            restrictedHeight - controlBarHeight + 5,
            restrictedWidth - 2 * margin - 55,
            restrictedHeight - controlBarHeight + 10,
            restrictedWidth - 2 * margin - 60,
            restrictedHeight - controlBarHeight + 15,
          ]}
          stroke="black"
          strokeWidth={2}
        />
      </Group>

      {/* full screen icon */}
      <Group>
        <Rect
          x={restrictedWidth - 2 * margin - 30}
          y={restrictedHeight - controlBarHeight + 5}
          width={10}
          height={10}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          x={restrictedWidth - 2 * margin - 30}
          y={restrictedHeight - controlBarHeight + 5}
          points={[0, 0, 10, 10]}
          stroke="black"
          strokeWidth={2}
        />
        <Line
          x={restrictedWidth - 2 * margin - 30}
          y={restrictedHeight - controlBarHeight + 5}
          points={[10, 0, 0, 10]}
          stroke="black"
          strokeWidth={2}
        />
      </Group>
    </Group>
  );
});
