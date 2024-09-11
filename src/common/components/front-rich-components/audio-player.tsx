import { forwardRef } from 'react';
import { Group, Line, Rect } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model'; // Ajusta la ruta según tu estructura
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../front-components/shape.const';

const AudioPlayerShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: 50,
  defaultWidth: 600,
  defaultHeight: 50,
};

export const getAudioPlayerShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  AudioPlayerShapeSizeRestrictions;

const shapeType: ShapeType = 'audioPlayer';
const arrowWidth = 20;
const volumeWidth = 20;

export const AudioPlayerShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;

  // Ajuste de las dimensiones del componente según restricciones
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      AudioPlayerShapeSizeRestrictions,
      width,
      height
    );

  const calculateWidth =
    restrictedWidth -
    volumeWidth -
    BASIC_SHAPE.DEFAULT_PADDING -
    (arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 4;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

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
      {/* Fondo de la barra de scroll */}
      <Rect
        x={arrowWidth}
        y={0}
        width={restrictedWidth - arrowWidth * 2}
        height={restrictedHeight}
        fill="#D0D0D0"
        stroke="#000000"
        strokeWidth={1}
      />

      {/* Flecha izquierda */}
      <Rect
        x={0}
        y={0}
        width={arrowWidth}
        height={restrictedHeight}
        fill="#E0E0E0"
        stroke="#A0A0A0"
        strokeWidth={1}
      />

      <Line
        x={4}
        y={restrictedHeight / 2}
        points={[8, -4, 2, 0, 8, 4]}
        fill="black"
        closed={true}
      />

      {/* Flecha derecha */}
      <Rect
        x={arrowWidth + BASIC_SHAPE.DEFAULT_PADDING}
        y={0}
        width={arrowWidth}
        height={restrictedHeight}
        fill="#E0E0E0"
        stroke="#A0A0A0"
        strokeWidth={1}
      />

      <Line
        x={arrowWidth + BASIC_SHAPE.DEFAULT_PADDING + 6}
        y={restrictedHeight / 2}
        points={[2, -4, 8, 0, 2, 4]}
        fill="black"
        closed={true}
      />

      <Rect
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 2}
        y={0}
        width={arrowWidth}
        height={restrictedHeight}
        fill="#E0E0E0"
        stroke="#A0A0A0"
        strokeWidth={1}
      />

      <Line
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING + 6) * 2}
        y={restrictedHeight / 2}
        points={[2, -4, 8, 0, 2, 4]}
        fill="black"
        closed={true}
      />

      <Rect
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 3}
        y={restrictedHeight / 4}
        width={calculateWidth}
        height={restrictedHeight / 2}
        stroke="black"
        strokeWidth={1}
        closed={true}
      />
      <Rect
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 3}
        y={restrictedHeight / 4}
        width={calculateWidth / 2}
        height={restrictedHeight / 2}
        stroke="black"
        fill="black"
        strokeWidth={1}
        closed={true}
      />
    </Group>
  );
});
