import { ButtonBarShape } from '@/common/components/mock-components/front-rich-components/buttonBar/buttonBar';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderButtonBar = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <ButtonBarShape
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
