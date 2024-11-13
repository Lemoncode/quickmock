import { forwardRef } from 'react';
import { ShapeProps } from '../shape.model';
import { ShapeSizeRestrictions } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { Group, Rect, Circle, Text } from 'react-konva';

const videoconferenceShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getVideoconferenceShapeSizeRestrictions =
  (): ShapeSizeRestrictions => videoconferenceShapeSizeRestrictions;

export const VideoConferenceShape = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, ...shapeProps } = props;
    const videoWidth = width;
    const videoHeight = height * 0.75;
    const smallVideoWidth = 120;
    const smallVideoHeight = 80;
    const controlRadius = 20;
    const controlsY = videoHeight + 50;

    fitSizeToShapeSizeRestrictions(
      videoconferenceShapeSizeRestrictions,
      width,
      height
    );

    return (
      <Group x={x} y={y} ref={ref} {...shapeProps}>
        {/* Pantalla de videoconferencia */}
        <Rect
          x={0}
          y={0}
          width={videoWidth}
          height={videoHeight}
          fill="lightgray"
          stroke="black"
          strokeWidth={2}
        />

        {/* Persona en la pantalla de videoconferencia */}
        <Circle
          cx={150}
          cy={130}
          radius={40}
          fill="white"
          stroke="black"
          strokeWidth={2}
        />
        <Rect
          x={110}
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
