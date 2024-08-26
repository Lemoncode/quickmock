import { SmalltextShape } from '@/common/components/front-text-components';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderSmalltext = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <SmalltextShape
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
      editType={shape.editType}
      isEditable={shape.allowsInlineEdition}
      text={shape.text}
      otherProps={shape.otherProps}
    />
  );
};
