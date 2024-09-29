import { ShapeModel } from '@/core/model';
import { ShapeRendererProps } from '../model';
import { ImageShape } from '@/common/components/mock-components/front-basic-shapes/image-shape/image-shape';

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
      typeOfTransformer={shape.typeOfTransformer}
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
