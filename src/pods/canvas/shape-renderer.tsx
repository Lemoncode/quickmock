import { ComboBoxShape } from '@/common/components/front-components';
import { ShapeType } from '@/core/model';
import Konva from 'konva';
import { ShapeModel, ShapeRefs } from './canvas.model';
import { InputShape } from '@/common/components/front-components/input-shape';

interface ShapeRendererProps {
  handleSelected: (id: string, type: ShapeType) => void;
  shapeRefs: React.MutableRefObject<ShapeRefs>;
  handleDragEnd: (id: string) => (e: Konva.KonvaEventObject<DragEvent>) => void;
  handleTransform: () => void;
}

const renderComboBox = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <ComboBoxShape
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
      onTransformEnd={handleTransform}
    />
  );
};

const renderInput = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

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
      onTransformEnd={handleTransform}
    />
  );
};

export const renderShapeComponent = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  switch (shape.type) {
    case 'combobox':
      return renderComboBox(shape, shapeRenderedProps);
    case 'input':
      return renderInput(shape, shapeRenderedProps);
    default:
      return <p>** Shape not defined **</p>;
  }
};
