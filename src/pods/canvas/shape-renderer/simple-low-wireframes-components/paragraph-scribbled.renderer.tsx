import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';
import { ParagraphScribbled } from '@/common/components/mock-components/front-low-wireframes-components/paragraph-scribbled-shape';

export const renderParagraphScribbled = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <ParagraphScribbled
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
      text={shape.text || 'Scribbled Paragraph'}
      otherProps={shape.otherProps}
    />
  );
};
