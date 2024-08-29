import { AppBarShape } from '@/common/components/front-rich-components/appBar';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderAppBar = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <AppBarShape
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
      isEditable={shape.allowsInlineEdition}
      text={shape.text}
      otherProps={shape.otherProps}
    />
  );
};
