import { ModalCoverShape } from '@/common/components/mock-components/front-basic-shapes';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderModalCover = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <ModalCoverShape
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      draggable
      typeOfTransformer={shape.typeOfTransformer}
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      otherProps={shape.otherProps}
    />
  );
};
