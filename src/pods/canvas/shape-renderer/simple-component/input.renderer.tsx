import { InputShape } from '@/common/components/front-components/input-shape';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '../../canvas.model';

export const renderInput = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const {
    handleSelected,
    shapeRefs,
    handleDragEnd,
    handleTransform,
    handleTransformEnd,
  } = shapeRenderedProps;

  return (
    <InputShape
      id={shape.id}
      key={shape.id}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      draggable
      onSelected={handleSelected}
      ref={shapeRefs.current[shape.id]}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransformEnd}
    />
  );
};

//       onTransform={handleTransform}
