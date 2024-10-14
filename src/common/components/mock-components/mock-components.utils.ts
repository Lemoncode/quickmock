import { ShapeType, Size } from '@/core/model';
import { ShapeProps } from './shape.model';
import { useMemo } from 'react';
import { useShapeComponentSelection } from '../shapes/use-shape-selection.hook';
import { KonvaEventObject } from 'konva/lib/Node';

export const useGroupShapeProps = (
  props: ShapeProps,
  restrictedSize: Size,
  shapeType: ShapeType,
  ref: React.ForwardedRef<any>
) => {
  const { width, height } = restrictedSize;
  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const commonProps = useMemo(
    () =>
      generateShapeGroupCommonProps(
        props,
        {
          width,
          height,
        },
        shapeType,
        ref,
        handleSelection
      ),
    [props, restrictedSize, shapeType, ref]
  );

  return commonProps;
};

export const generateShapeGroupCommonProps = (
  props: ShapeProps,
  restrictedSize: Size,
  shapeType: ShapeType,
  ref: React.ForwardedRef<any>,
  handleSelection: (e: KonvaEventObject<MouseEvent>) => void
) => {
  const { x, y, id } = props;

  return {
    x,
    y,
    width: restrictedSize.width,
    height: restrictedSize.height,
    'data-id': id,
    onClick: handleSelection,
    ref,
    shapeType,
  };
};
