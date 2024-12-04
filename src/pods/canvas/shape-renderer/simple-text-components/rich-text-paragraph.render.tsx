/*import { ShapeRendererProps } from '../model';
import { ShapeModel } from '@/core/model';
import { RichTextParagraphShape } from '@/common/components/mock-components/front-text-components';
import { Stage, Layer } from 'react-konva';

export const renderRichTextParagraph = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
 const { handleSelected, shapeRefs, handleDragEnd, handleTransform} =
 shapeRenderedProps;

  return (
    <RichTextParagraphShape 
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
*/
