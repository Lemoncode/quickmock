import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';
import { TextScribbled } from '@/common/components/mock-components/front-low-wireframes-components';

export const renderTextScribbled = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <TextScribbled
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
      text={shape.text || 'Scribbled Text'}
      otherProps={shape.otherProps}
    />
  );
};
