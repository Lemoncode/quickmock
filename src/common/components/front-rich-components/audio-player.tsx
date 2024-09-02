import { forwardRef } from 'react';
import { Group, Rect, Line, Path } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeProps } from '../front-components/shape.model';

const audioPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 400,
};

export const getAudioPlayerShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  audioPlayerShapeSizeRestrictions;

export const AudioPlayer = forwardRef<any, ShapeProps>(
  (
    { x, y, id, onPlay, onRewind, onForward, onVolumeChange, ...shapeProps },
    ref
  ) => {
    return (
      <Group x={x} y={y} ref={ref} {...shapeProps}>
        {/* Botón de retroceso */}
        <Group onClick={onRewind}>
          <Line
            points={[55, 40, 45, 50, 55, 60]}
            closed
            fill="black"
            stroke="black"
            strokeWidth={2}
          />
          <Line points={[65, 40, 65, 60]} stroke="black" strokeWidth={2} />
        </Group>

        {/* Botón de play */}
        <Group onClick={onPlay}>
          <Line
            points={[135, 40, 155, 50, 135, 60]}
            closed
            fill="black"
            stroke="black"
            strokeWidth={2}
          />
        </Group>

        {/* Botón de avance */}
        <Group onClick={onForward}>
          <Line
            points={[215, 40, 225, 50, 215, 60]}
            closed
            fill="black"
            stroke="black"
            strokeWidth={2}
          />
          <Line points={[205, 40, 205, 60]} stroke="black" strokeWidth={2} />
        </Group>

        {/* Barra de progreso */}
        <Rect
          x={270}
          y={45}
          width={200}
          height={10}
          stroke="black"
          strokeWidth={2}
          fill="none"
        />
        <Rect x={270} y={45} width={100} height={10} fill="black" />

        {/* Control de volumen mejorado */}
        <Group onClick={onVolumeChange}>
          {/* Altavoz */}
          <Path
            data="M500,45 L510,45 L520,35 L520,65 L510,55 L500,55 Z"
            fill="black"
            stroke="black"
            strokeWidth={2}
          />
          {/* Ondas de sonido */}
          <Path
            data="M530,40 Q540,50 530,60"
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
          <Path
            data="M545,35 Q560,50 545,65"
            fill="none"
            stroke="black"
            strokeWidth={2}
          />
        </Group>
      </Group>
    );
  }
);

export default AudioPlayer;
