import { ShapeType } from '@/core/model';
import { KonvaEventObject } from 'konva/lib/Node';
import { ShapeProps } from '../front-components/shape.model';
import { isUserDoingMultipleSelection } from '@/common/utils/shapes';

// In the future we will refactor and include below shapes all the front-
// shapes
export const useShapeComponentSelection = (
  props: ShapeProps,
  shapeType: ShapeType
) => {
  const { id, onSelected } = props;

  const handleSelection = (e: KonvaEventObject<MouseEvent>) => {
    onSelected(id, shapeType, isUserDoingMultipleSelection(e));
  };

  return {
    handleSelection,
  };
};
