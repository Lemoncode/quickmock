import { Coord } from '@/core/model';
import Konva from 'konva';

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface TransformerBox {
  boxRelativeToStage?: Box;
  absolutePosition?: Coord;
}

export const getTransformerBoxAndCoords = (
  transformerRef: React.RefObject<Konva.Transformer>
): TransformerBox | null => {
  if (!transformerRef.current) return null;

  const transformer = transformerRef.current;
  const stage = transformer.getStage();
  if (!stage) return null;

  let box = transformer.findOne('.back')?.getClientRect({ relativeTo: stage });

  let absolutePosition = transformer.findOne('.back')?.getAbsolutePosition();

  return {
    boxRelativeToStage: box,
    absolutePosition: absolutePosition,
  };
};
