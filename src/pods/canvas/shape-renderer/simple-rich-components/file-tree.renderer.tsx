import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';
import { FileTreeShape } from '@/common/components/mock-components/front-rich-components/file-tree/file-tree';

export const renderFileTree = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <FileTreeShape
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
      editType={shape.editType}
      isEditable={true}
      text={shape.text}
      otherProps={shape.otherProps}
    />
  );
};
