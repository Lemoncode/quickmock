import { VerticalMenuShape } from '@/common/components/mock-components/front-rich-components';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderVerticalMenuShape = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <VerticalMenuShape
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
      editType={shape.editType}
      isEditable={true}
      text={shape.text}
      otherProps={shape.otherProps}
    />
  );
};
