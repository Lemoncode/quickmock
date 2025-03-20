import { forwardRef } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';
import { BASIC_SHAPE } from '../front-components/shape.const';

const modalDialogShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 250,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
  defaultHeight: 300,
};

export const getModalDialogShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  modalDialogShapeSizeRestrictions;

const shapeType: ShapeType = 'modalDialog';

export const ModalDialogContainer = forwardRef<any, ShapeProps>(
  (props, ref) => {
    const { x, y, width, height, id, onSelected, text, ...shapeProps } = props;
    const restrictedSize = fitSizeToShapeSizeRestrictions(
      modalDialogShapeSizeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
    const margin = 10;
    const titleBarHeight = 50;

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Background */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* HeaderBar */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={titleBarHeight}
          stroke="black"
          strokeWidth={2}
          fill="lightgray"
        />
        <Text
          x={margin * 3}
          y={margin * 2}
          text={text}
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
          fontSize={12}
          fill="black"
          ellipsis={true}
          wrap="none"
          width={restrictedWidth - margin * 6 - 40}
        />

        {/* (X) */}
        <Group x={restrictedWidth - 40} y={10}>
          <Rect
            width={30}
            height={30}
            fill="white"
            stroke="black"
            strokeWidth={1}
          />
          <Text
            x={8}
            y={8}
            text="X"
            fontFamily="Arial"
            fontSize={18}
            fill="black"
          />
        </Group>
      </Group>
    );
  }
);

export default ModalDialogContainer;
