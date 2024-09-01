import { Group, Circle, Path, Rect } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useMemo } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';

const MapChartShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 50,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 200,
};

const MAP_FIX_WIDTH = 200;
const MAP_FIX_HEIGHT = 200;

export const getMapChartShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  MapChartShapeSizeRestrictions;

const shapeType: ShapeType = 'map';

export const MapChartShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      MapChartShapeSizeRestrictions,
      width,
      height
    );

  const scaleX = useMemo(() => {
    return restrictedWidth / MAP_FIX_WIDTH;
  }, [restrictedWidth]);

  const scaleY = useMemo(() => {
    return restrictedHeight / MAP_FIX_HEIGHT;
  }, [restrictedHeight]);

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
      <Group
        width={MAP_FIX_WIDTH}
        height={MAP_FIX_HEIGHT}
        scaleX={scaleX}
        scaleY={scaleY}
      >
        {/* Fondo del mapa */}
        <Rect width={400} height={400} fill="#e6e6e6" />

        {/* Carreteras principales */}
        <Rect x={60} y={0} width={30} height={400} fill="#cfcfcf" />
        <Rect x={0} y={190} width={400} height={30} fill="#cfcfcf" />

        {/* Carreteras secundarias */}
        <Rect x={0} y={100} width={200} height={20} fill="#d9d9d9" />
        <Rect x={200} y={250} width={180} height={20} fill="#d9d9d9" />
        <Rect x={180} y={0} width={20} height={200} fill="#d9d9d9" />

        {/* Edificios comerciales */}
        <Rect x={70} y={50} width={100} height={60} fill="#a3a3a3" />
        <Rect x={230} y={260} width={120} height={70} fill="#a3a3a3" />

        {/* Edificios residenciales */}
        <Rect x={280} y={50} width={60} height={60} fill="#bfbfbf" />
        <Rect x={90} y={280} width={60} height={100} fill="#bfbfbf" />

        {/* Áreas verdes */}
        <Rect x={150} y={300} width={100} height={70} fill="#8fbc8f" />
        <Rect x={220} y={120} width={70} height={50} fill="#8fbc8f" />

        {/* Marcadores de ubicación */}
        <Path
          data="M180,110 Q180,90 200,90 Q220,90 220,110 Q220,130 200,150 Q180,130 180,110"
          fill="red"
        />
        <Circle x={200} y={110} radius={5} fill="white" />

        <Path
          data="M280,290 Q280,270 300,270 Q320,270 320,290 Q320,310 300,330 Q280,310 280,290"
          fill="blue"
        />
        <Circle x={300} y={290} radius={5} fill="white" />

        <Path
          data="M120,340 Q120,320 140,320 Q160,320 160,340 Q160,360 140,380 Q120,360 120,340"
          fill="green"
        />
        <Circle x={140} y={340} radius={5} fill="white" />
      </Group>
    </Group>
  );
});
