import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Circle, Text } from 'react-konva';
import { useGroupShapeProps } from '../mock-components.utils';

const videoConferenceShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 300,
  minHeight: 200,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoconferenceShapeSizeRestrictions =
  (): ShapeSizeRestrictions => videoConferenceShapeSizeRestrictions;

export const VideoConferenceShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, ...shapeProps } = props;
    const videoWidth = width;
    const videoHeight = height * 0.75;
    const smallVideoWidth = 120;
    const smallVideoHeight = 80;
    const controlRadius = 20;
    const controlsY = videoHeight + 7;
    const shapeType: ShapeType = 'videoConference';

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      videoConferenceShapeSizeRestrictions,
      width,
      height
    );
    const margin = 10;
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Pantalla de videoconferencia */}
        <Rect
          x={0}
          y={-100}
          width={restrictedWidth - 2 * margin}
          height={restrictedHeight - 2 * margin}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Persona en la pantalla de videoconferencia */}
        <Circle
          cx={150}
          cy={130}
          x={100}
          radius={40}
          fill="white"
          stroke="black"
          strokeWidth={2}
        />
        <Rect
          x={margin}
          y={170}
          width={80}
          height={100}
          fill="white"
          stroke="black"
          strokeWidth={2}
          cornerRadius={20} // Bordes redondeados
        />

        {/* Video de la persona que habla */}
        <Rect
          x={videoWidth - smallVideoWidth - 20}
          y={videoHeight - smallVideoHeight - 20}
          width={smallVideoWidth}
          height={smallVideoHeight}
          fill="darkgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Persona en la ventana pequeña de video */}
        <Circle
          cx={videoWidth - smallVideoWidth / 2 - 20}
          cy={260}
          x={160}
          radius={20}
          fill="white"
          stroke="black"
          strokeWidth={2}
        />
        <Rect
          x={videoWidth - smallVideoWidth / 2 - 35}
          y={280}
          width={30}
          height={40}
          fill="white"
          stroke="black"
          strokeWidth={2}
          cornerRadius={10} // Bordes redondeados
        />

        {/* Botón de silenciar */}
        <Group x={videoWidth / 2 - 100} y={controlsY}>
          <Circle
            x={0}
            y={0}
            radius={controlRadius}
            fill="gray"
            stroke="black"
            strokeWidth={2}
          />
          <Text
            x={-8}
            y={5}
            text="🔇"
            fontFamily="Arial"
            fontSize={16}
            fill="white"
          />
        </Group>

        {/* Botón de cámara */}
        <Group x={videoWidth / 2} y={controlsY}>
          <Circle
            x={0}
            y={0}
            radius={controlRadius}
            fill="gray"
            stroke="black"
            strokeWidth={2}
          />
          <Text
            x={-8}
            y={5}
            text="📷"
            fontFamily="Arial"
            fontSize={16}
            fill="white"
          />
        </Group>

        {/* Botón de colgar */}
        <Group x={videoWidth / 2 + 100} y={controlsY}>
          <Circle
            x={0}
            y={0}
            radius={controlRadius}
            fill="red"
            stroke="black"
            strokeWidth={2}
          />
          <Text
            x={-8}
            y={5}
            text="📞"
            fontFamily="Arial"
            fontSize={16}
            fill="white"
          />
        </Group>
      </Group>
    );
  }
);

export default VideoConferenceShape;
