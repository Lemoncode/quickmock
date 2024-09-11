import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { Group, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { forwardRef } from 'react';
import { parseCSVHeader, splitCSVIntoRows } from '../tabsbar/tabsbar.utils';

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

  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      buttonBarShapeSizeRestrictions,
      width,
      height
    );

  const csvData = splitCSVIntoRows(text);
  const headers = parseCSVHeader(csvData[0]);
  const tabLabels = headers.map(header => header.text);

  const dynamicTabWidth = restrictedWidth / tabLabels.length;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { stroke, strokeStyle, fill, textColor } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const activeTab = otherProps?.activeTab ?? 0;

  return (
    <Group
      x={x}
      y={y}
      width={restrictedWidth}
      height={restrictedHeight}
      ref={ref}
      {...shapeProps}
      onClick={handleSelection}
    >
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
