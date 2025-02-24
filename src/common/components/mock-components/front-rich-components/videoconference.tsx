import { Group, Rect, Circle, Line, Arc, Path } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';

const videoconferenceShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoconferenceShapeSizeRestrictions =
  (): ShapeSizeRestrictions => videoconferenceShapeSizeRestrictions;

const shapeType: ShapeType = 'videoPlayer';

export const VideoconferenceShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, ...shapeProps } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      videoconferenceShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const controlBarHeight = 40;

    const [avatar1BodyArcRadius, setAvatar1BodyArcRadius] = useState(0);

    useEffect(() => {
      setAvatar1BodyArcRadius(() => {
        const newRadius = Math.min(
          restrictedWidth / 2,
          (restrictedHeight - controlBarHeight - 20) / 2
        );
        return newRadius;
      });
    }, [restrictedWidth, restrictedHeight]);

    const avatar2Width = useMemo(() => {
      if (restrictedWidth * 0.2 >= restrictedHeight / 2) {
        return restrictedHeight / 2;
      }
      return restrictedWidth * 0.2;
    }, [restrictedWidth, restrictedHeight]);

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Avatar 1 */}
        <Group>
          <Rect
            x={0}
            y={0}
            width={restrictedWidth}
            height={restrictedHeight}
            cornerRadius={10}
            stroke="black"
            strokeWidth={2}
            fill="lightgray"
          />
          <Arc
            x={restrictedWidth / 2}
            y={restrictedHeight - controlBarHeight}
            stroke="black"
            strokeWidth={2}
            innerRadius={0}
            outerRadius={avatar1BodyArcRadius}
            angle={180}
            rotation={180}
            fill="white"
          />
          <Circle
            x={restrictedWidth / 2}
            y={restrictedHeight - controlBarHeight - avatar1BodyArcRadius * 1.5}
            width={avatar1BodyArcRadius}
            height={avatar1BodyArcRadius}
            stroke="black"
            strokeWidth={2}
            fill="white"
          />
        </Group>
        {/* Avatar 2 */}
        <Group
          x={restrictedWidth - avatar2Width - 10}
          y={restrictedHeight - controlBarHeight - avatar2Width}
        >
          <Rect
            width={avatar2Width}
            height={avatar2Width}
            cornerRadius={[10, 10, 0, 0]}
            stroke="black"
            strokeWidth={2}
            fill="darkgrey"
          />
          <Arc
            x={avatar2Width - avatar2Width * 0.5}
            y={avatar2Width}
            stroke="black"
            strokeWidth={2}
            innerRadius={0}
            outerRadius={avatar2Width * 0.35}
            angle={180}
            rotation={180}
            fill="white"
          />
          <Circle
            x={avatar2Width - avatar2Width * 0.5}
            y={avatar2Width - avatar2Width * 0.55}
            width={avatar2Width * 0.4}
            height={avatar2Width * 0.4}
            stroke="black"
            strokeWidth={2}
            fill="white"
          />
        </Group>
        <Line
          points={[
            0,
            restrictedHeight - controlBarHeight,
            restrictedWidth,
            restrictedHeight - controlBarHeight,
          ]}
          stroke="black"
          strokeWidth={2}
        />
        {/* Control Bar */}
        <Group>
          <Rect
            x={0}
            y={restrictedHeight - controlBarHeight}
            width={restrictedWidth}
            height={controlBarHeight}
            cornerRadius={0}
          />
          {/* hang up call button*/}
          <Circle
            x={restrictedWidth / 2 + 50}
            y={restrictedHeight - controlBarHeight / 2}
            width={30}
            height={30}
            fill="red"
            stroke="black"
            strokeWidth={2}
          />
          <Arc
            x={restrictedWidth / 2 + 52}
            y={restrictedHeight - controlBarHeight / 2}
            stroke="black"
            strokeWidth={2}
            innerRadius={5}
            outerRadius={6}
            angle={180}
            rotation={60}
            fill="white"
          />
          {/* Camera Button*/}
          <Circle
            x={restrictedWidth / 2}
            y={restrictedHeight - controlBarHeight / 2}
            width={30}
            height={30}
            fill="darkgray"
            stroke="black"
            strokeWidth={2}
          />
          <Rect
            x={restrictedWidth / 2 - 9}
            y={restrictedHeight - controlBarHeight / 2 - 6}
            width={18}
            height={12}
            stroke="black"
            strokeWidth={2}
          />
          <Circle
            x={restrictedWidth / 2}
            y={restrictedHeight - controlBarHeight / 2}
            width={5}
            height={5}
            fill="black"
            stroke="black"
            strokeWidth={2}
          />
          {/* Microphone Button*/}
          <Circle
            x={restrictedWidth / 2 - 50}
            y={restrictedHeight - controlBarHeight / 2}
            width={30}
            height={30}
            fill="darkgray"
            stroke="black"
            strokeWidth={2}
          />
          <Group
            x={restrictedWidth / 2 - 62}
            y={restrictedHeight - controlBarHeight + 9}
          >
            <Path
              data="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
              stroke="black"
              strokeWidth={2}
              scaleX={1}
              scaleY={1}
            />
            <Path
              data="M5 10a7 7 0 0 0 14 0"
              stroke="black"
              strokeWidth={2}
              scaleX={1}
              scaleY={1}
            />
            <Path
              data="M8 21l8 0"
              stroke="black"
              strokeWidth={2}
              scaleX={1}
              scaleY={1}
            />
            <Path
              data="M12 17l0 4"
              stroke="black"
              strokeWidth={2}
              scaleX={1}
              scaleY={1}
            />
          </Group>
        </Group>
      </Group>
    );
  }
);
