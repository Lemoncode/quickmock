import { forwardRef } from 'react';
import { Group, Line, Rect } from 'react-konva';
import { ShapeProps } from '../front-components/shape.model';
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
const volumeWidth = 25;

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

  const margin = 10;
  const controlBarHeight = 30;

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
      <Rect
        x={arrowWidth}
        y={0}
        width={restrictedWidth - arrowWidth * 2}
        height={restrictedHeight}
        fill="white"
        strokeWidth={1}
      />

      {/* Flecha izquierda */}
      <Rect
        x={0}
        y={0}
        width={arrowWidth}
        height={restrictedHeight}
        strokeWidth={1}
      />

      <Line
        x={-37}
        y={-30}
        points={[65, 45, 65, 60]}
        stroke="black"
        strokeWidth={2}
      />

      <Line
        x={4}
        y={restrictedHeight / 2.3}
        points={[16, -8, 4, 0, 16, 8]}
        fill="black"
        closed={true}
      />

      {/* Flecha derecha */}
      <Rect
        x={arrowWidth + BASIC_SHAPE.DEFAULT_PADDING}
        y={0}
        width={arrowWidth}
        height={restrictedHeight}
        strokeWidth={1}
      />

      <Line
        x={arrowWidth + BASIC_SHAPE.DEFAULT_PADDING + 6}
        y={restrictedHeight / 2.3}
        points={[4, -8, 16, 0, 4, 8]}
        fill="black"
        closed={true}
      />

      <Rect
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 2}
        y={0}
        width={arrowWidth}
        height={restrictedHeight}
        strokeWidth={1}
      />

      <Line
        x={0}
        y={-30}
        points={[65, 45, 65, 60]}
        stroke="black"
        strokeWidth={2}
      />

      <Line
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING + 6) * 2}
        y={restrictedHeight / 2.3}
        points={[4, -8, 16, 0, 4, 8]}
        fill="black"
        closed={true}
      />

      <Rect
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 3}
        y={restrictedHeight / 4}
        width={calculateWidth}
        height={restrictedHeight / 3}
        stroke="black"
        strokeWidth={1}
        closed={true}
      />
      <Rect
        x={(arrowWidth + BASIC_SHAPE.DEFAULT_PADDING) * 3}
        y={restrictedHeight / 4}
        width={calculateWidth / 2}
        height={restrictedHeight / 3}
        stroke="white"
        fill="black"
        strokeWidth={1}
        closed={true}
      />

      {/* Control de volumen mejorado */}
      <Group>
        {/* Altavoz */}
        <Line
          x={arrowWidth + BASIC_SHAPE.DEFAULT_PADDING + 15}
          y={-10}
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
          fill="black"
          strokeWidth={2}
          closed={true}
        />
        <Line
          x={arrowWidth + BASIC_SHAPE.DEFAULT_PADDING + 15}
          y={-10}
          points={[
            restrictedWidth - 2 * margin - 60,
            restrictedHeight - controlBarHeight + 5,
            restrictedWidth - 2 * margin - 55,
            restrictedHeight - controlBarHeight + 10,
            restrictedWidth - 2 * margin - 60,
            restrictedHeight - controlBarHeight + 15,
          ]}
          stroke="black"
          fill="black"
          strokeWidth={2}
        />
      </Group>
    </Group>
  );
});
