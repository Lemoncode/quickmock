import { ShapeModel } from '@/core/model';
import { ShapeRendererProps } from '../model';
import { Group, Text } from 'react-konva';
import { BASIC_SHAPE } from '@/common/components/mock-components/front-components/shape.const';

export const renderNotFound = (
  shape: ShapeModel,
  shapeRenderedProps: ShapeRendererProps
) => {
  const { handleSelected, shapeRefs, handleDragEnd, handleTransform } =
    shapeRenderedProps;

  return (
    <Group
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
    >
      <Text
        x={20}
        y={30}
        text="**This component has not been implemented yet**"
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={15}
        fill="gray"
      />
    </Group>
  );
};
