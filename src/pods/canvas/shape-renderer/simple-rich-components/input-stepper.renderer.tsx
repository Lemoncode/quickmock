import { InputWithStepper } from '@/common/components/mock-components/front-rich-components/input-stepper';
import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';

export const renderInputStepper = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <InputWithStepper
      id={shape.id}
      key={shape.id}
      ref={shapeRefs.current[shape.id]}
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      draggable
      onSelected={handleSelected}
      onDragEnd={handleDragEnd(shape.id)}
      onTransform={handleTransform}
      onTransformEnd={handleTransform}
      initialValue={0}
    />
  );
};
