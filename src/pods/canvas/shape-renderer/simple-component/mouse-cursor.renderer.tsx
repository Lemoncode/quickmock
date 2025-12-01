import { MouseCursorShape } from '@/common/components/mock-components/front-components';
import { ShapeModel } from '@/core/model';
import { ShapeRendererProps } from '../model';

export const renderMouseCursor = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  console.log(shape);

  return (
    <MouseCursorShape
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      name="shape"
      width={shape.width}
      height={shape.height}
      draggable
      typeOfTransformer={shape.typeOfTransformer}
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      otherProps={shape.otherProps}
    />
  );
};
