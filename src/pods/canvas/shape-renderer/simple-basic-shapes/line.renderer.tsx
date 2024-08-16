import { LineShape } from '@/common/components/front-basic-sapes';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderLine = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <LineShape
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      name="shape"
      width={shape.width}
      height={shape.height}
      draggable
      hasLateralTransformer={shape.hasLateralTransformer}
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      otherProps={shape.otherProps}
    />
  );
};
