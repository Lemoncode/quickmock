import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../../front-components/shape.model';
import { calculatePositions, mapTextToSections } from './breadcrumb.business';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { useShapeProps } from '../../shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';

export const breadcrumbShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 600,
  minHeight: 60,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 60,
};

export const GROUP_HEIGHT = 60;

const shapeType: ShapeType = 'breadcrumb';

export const getBreadcrumbShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  breadcrumbShapeSizeRestrictions;

export const BreadcrumbShape = forwardRef<any, ShapeProps>((props, ref) => {
  const {
    x,
    y,
    id,
    width,
    height,
    onSelected,
    text,
    otherProps,
    ...shapeProps
  } = props;
  const [sections, setSections] = useState<string[]>([]);
  const [positions, setPositions] = useState<number[]>([]);
  const [groupWidth, setGroupWidth] = useState<number>(0);
  const textRefs = useRef<any[]>([]);

  useEffect(() => {
    setSections(text ? mapTextToSections(text).sections : []);
  }, [text]);

  useEffect(() => {
    const { positions: newPositions, groupWidth: newGroupWidth } =
      calculatePositions(sections, textRefs);
    setPositions(newPositions);
    setGroupWidth(newGroupWidth);
  }, [sections]);

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  const { textColor } = useShapeProps(otherProps, BASIC_SHAPE);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={groupWidth}
      height={GROUP_HEIGHT}
      {...shapeProps}
      onClick={handleSelection}
    >
      {sections.map((section, index) => {
        const posX = positions[index] || 0;
        return (
          <Group key={index}>
            <Text
              ref={el => (textRefs.current[index] = el)}
              x={posX}
              y={30}
              text={section}
              fontFamily="Arial"
              fontSize={16}
              fill={textColor}
              textDecoration="underline"
            />
            {index < sections.length - 1 && (
              <Text
                x={posX + (textRefs.current[index]?.getTextWidth() ?? 0) + 5}
                y={30}
                text=">"
                fontFamily="Arial"
                fontSize={16}
                fill="black"
              />
            )}
          </Group>
        );
      })}
    </Group>
  );
});
