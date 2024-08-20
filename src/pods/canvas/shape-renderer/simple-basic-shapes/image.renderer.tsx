import { ShapeModel } from '@/core/model';
import { ShapeRendererProps } from '../model';
import { ImageShape } from '@/common/components/front-basic-sapes/image-shape/image-shape';

export const renderImage = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <ImageShape
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      name="shape"
      width={shape.width}
      height={shape.height}
      draggable
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      isEditable={shape.allowsInlineEdition}
      editType={shape.editType}
      otherProps={shape.otherProps}
    />
  );
};
