import { SvgIcon } from '@/common/components/mock-components/front-components';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderIcon = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <SvgIcon
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      name="shape"
      draggable
      typeOfTransformer={shape.typeOfTransformer}
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      iconInfo={shape.otherProps?.icon}
      iconSize={shape.otherProps?.iconSize}
    />
  );
};
