import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { forwardRef } from 'react';
import {
  extractCSVHeaders,
  splitCSVContentIntoRows,
} from '@/common/utils/active-element-selector.utils';
import { useGroupShapeProps } from '../../mock-components.utils';

const buttonBarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getButtonBarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  buttonBarShapeSizeRestrictions;

const shapeType: ShapeType = 'buttonBar';

export const ButtonBarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    width,
    height,
    id,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    buttonBarShapeSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const csvData = splitCSVContentIntoRows(text);
  const headers = extractCSVHeaders(csvData[0]);
  const tabLabels = headers.map(header => header.text);

  const dynamicTabWidth = restrictedWidth / tabLabels.length;

  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const activeTab = otherProps?.activeElement ?? 0;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {tabLabels.map((header, index) => (
        <Group key={index} x={index * dynamicTabWidth}>
          <Rect
            width={dynamicTabWidth}
            height={restrictedHeight}
            fill={index === activeTab ? 'lightblue' : fill}
            stroke={stroke}
            strokeWidth={1}
            dash={strokeStyle}
          />
          <Text
            x={0}
            y={18}
            width={dynamicTabWidth - 20}
            height={restrictedHeight - 20}
            ellipsis={true}
            wrap="none"
            text={header} // Use the header text
            fontFamily="Arial"
            fontSize={16}
            fill={textColor}
            align="center"
          />
        </Group>
      ))}
    </Group>
  );
});
