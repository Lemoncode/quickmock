import { TextAreaShape } from '@/common/components/front-components/textarea-shape';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderTextArea = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <TextAreaShape
      id={shape.id}
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      name="shape"
      draggable
      onSelected={handleSelected}
      ref={shapeRefs.current[shape.id]}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      editType={shape.editType}
      isEditable={shape.editType}
      text={shape.text}
    />
  );
};
