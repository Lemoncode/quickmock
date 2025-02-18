import { ShapeModel } from '@/core/model';
import { ShapeRendererProps } from '../model';
import { ToggleLightDark } from '@/common/components/mock-components/front-components/togglelightdark-shape';
export const renderToggleLightDark = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <ToggleLightDark
      id={shape.id}
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      name="shape"
      draggable
      typeOfTransformer={shape.typeOfTransformer}
      onSelected={handleSelected}
      ref={shapeRefs.current[shape.id]}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      otherProps={shape.otherProps}
    />
  );
};
