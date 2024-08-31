import { ShapeType } from '@/core/model';
import { KonvaEventObject } from 'konva/lib/Node';
import { ShapeProps } from '../front-components/shape.model';
import { isUserDoingMultipleSelectionUsingCtrlOrCmdKey } from '@/common/utils/shapes';

// In the future we will refactor and include below this folder all the shapes (front, container, ...)
// #307
// https://github.com/Lemoncode/quickmock/issues/307
export const useShapeComponentSelection = (
  props: ShapeProps,
  shapeType: ShapeType
) => {
  const { id, onSelected } = props;

  const handleSelection = (e: KonvaEventObject<MouseEvent>) => {
    onSelected(id, shapeType, isUserDoingMultipleSelectionUsingCtrlOrCmdKey(e));
  };

  return {
    handleSelection,
  };
};
