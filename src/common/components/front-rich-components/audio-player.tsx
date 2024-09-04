import { forwardRef } from 'react';
import { Group, Line, Rect, Path } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model'; // Ajusta la ruta según tu estructura
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

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

const shapeType: ShapeType = 'audioPlayer';

export const AudioPlayerShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;

  // Ajuste de las dimensiones del componente según restricciones
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      audioPlayerShapeSizeRestrictions,
      width,
      height
    );

  const originalWidth = 600; // Ancho del diseño original
  const originalHeight = 400; // Alto del diseño original

  // Calcular la escala
  const scale = Math.min(
    restrictedWidth / originalWidth,
    restrictedHeight / originalHeight
  );

  // Calcular el offset para centrar el componente
  const offsetX = (restrictedWidth - originalWidth * scale) / 2;
  const offsetY = (restrictedHeight - originalHeight * scale) / 2;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x + offsetX}
      y={y + offsetY}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
      {/* Botón de retroceso */}
      <Group>
        <Line
          points={[
            55 * scale,
            40 * scale,
            45 * scale,
            50 * scale,
            55 * scale,
            60 * scale,
            55 * scale,
            40 * scale,
          ]}
          fill="black"
          stroke="black"
          strokeWidth={2 * scale}
          closed
        />
        <Line
          points={[65 * scale, 40 * scale, 65 * scale, 60 * scale]}
          stroke="black"
          strokeWidth={2 * scale}
        />
      </Group>

      {/* Botón de play */}
      <Group>
        <Line
          points={[
            135 * scale,
            40 * scale,
            155 * scale,
            50 * scale,
            135 * scale,
            60 * scale,
            135 * scale,
            40 * scale,
          ]}
          fill="black"
          stroke="black"
          strokeWidth={2 * scale}
          closed
        />
      </Group>

      {/* Botón de avance */}
      <Group>
        <Line
          points={[
            215 * scale,
            40 * scale,
            225 * scale,
            50 * scale,
            215 * scale,
            60 * scale,
            215 * scale,
            40 * scale,
          ]}
          fill="black"
          stroke="black"
          strokeWidth={2 * scale}
          closed
        />
        <Line
          points={[205 * scale, 40 * scale, 205 * scale, 60 * scale]}
          stroke="black"
          strokeWidth={2 * scale}
        />
      </Group>

      {/* Barra de progreso */}
      <Group>
        <Rect
          x={270 * scale}
          y={45 * scale}
          width={200 * scale}
          height={10 * scale}
          strokeWidth={2 * scale}
          fill="white"
          stroke="black"
        />
        <Rect
          x={270 * scale}
          y={45 * scale}
          width={100 * scale}
          height={10 * scale}
          fill="black"
          stroke="black"
        />
      </Group>

      {/* Control de volumen mejorado */}
      <Group>
        <Path
          data="M500,45 L510,45 L520,35 L520,65 L510,55 L500,55 Z"
          fill="black"
          stroke="black"
          strokeWidth={2 * scale}
        />
        <Path
          data="M530,40 Q540,50 530,60"
          fill="none"
          stroke="black"
          strokeWidth={2 * scale}
        />
        <Path
          data="M545,35 Q560,50 545,65"
          fill="none"
          stroke="black"
          strokeWidth={2 * scale}
        />
      </Group>
    </Group>
  );
});
