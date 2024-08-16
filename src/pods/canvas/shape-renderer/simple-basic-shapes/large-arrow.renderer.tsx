import { LargeArrowShape } from '@/common/components/front-basic-sapes';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderLargeArrowShape = (
  shape: ShapeModel,
  shapeRendererProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRendererProps;

  return (
    <LargeArrowShape
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      draggable
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
    />
  );
};
