import { Group, Rect, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import {
  extractCSVHeaders,
  splitCSVContentIntoRows,
} from '@/common/utils/active-element-selector.utils';
import { useGroupShapeProps } from '../../mock-components.utils';

const horizontalMenuShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 25,
  maxWidth: -1,
  maxHeight: 100,
  defaultWidth: 500,
  defaultHeight: 50,
};

export const getHorizontalMenuShapeSizeRestrictions =
  (): ShapeSizeRestrictions => horizontalMenuShapeSizeRestrictions;

const shapeType: ShapeType = 'horizontal-menu';

export const HorizontalMenu = forwardRef<any, ShapeProps>((props, ref) => {
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

  const csvData = splitCSVContentIntoRows(text);
  const headers = extractCSVHeaders(csvData[0]);
  const itemLabels = headers.map(header => header.text);

  const numberOfItems = itemLabels.length;
  const itemSpacing = 10;

  const { stroke, strokeStyle, fill, textColor, borderRadius, fontSize } =
    useShapeProps(otherProps, BASIC_SHAPE);

  const textHeight = fontSize * 1.2; // la proporción entre el alto visible y el tamaño de fuente total está entre 1.1 y 1.25
  const verticalPadding = 8; // valor común para que si la fuente es muy grande o pequeña no toque los bordes y si son letras como la g, j, p, q, y tengan espacio

  const autoHeight = textHeight + verticalPadding * 2; // altura del texto y el padding. El padding es doble porque es arriba y abajo

  const dynamicHeight = Math.max(
    horizontalMenuShapeSizeRestrictions.minHeight,
    Math.min(
      autoHeight,
      horizontalMenuShapeSizeRestrictions.maxHeight > 0
        ? horizontalMenuShapeSizeRestrictions.maxHeight
        : autoHeight
    )
  ); // calcula el alto dinámico según las restricciones (minHeight y maxHeight). Si el autoHeight es menor que el minHeight, se usa el minHeight. Si es mayor que el maxHeight (y maxHeight > 0), se usa el maxHeight. Como el maxHeight puede ser -1 (sin límite), se usa el autoHeight en ese caso.

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    horizontalMenuShapeSizeRestrictions,
    width,
    dynamicHeight
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const textY = restrictedHeight / 2 - textHeight / 2; // centra el texto verticalmente en el rectángulo`. restrictedHeight / 2 es el centro del rectángulo y se le resta la mitad de la altura del texto para que el texto quede centrado. - textHeight / 2 es para que el texto quede centrado verticalmente.

  const activeSelected = otherProps?.activeElement ?? 0;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const totalMargins = restrictedWidth - itemSpacing * (numberOfItems + 1);
  const itemWidth = totalMargins / numberOfItems;

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        stroke={stroke}
        strokeWidth={2}
        dash={strokeStyle}
        fill={fill}
        cornerRadius={borderRadius}
      />

      {itemLabels.map((header, index) => (
        <Group key={index}>
          <Rect
            x={itemSpacing * (index + 1) + itemWidth * index}
            y={verticalPadding / 2} // un poco de padding arriba y abajo
            width={itemWidth}
            height={restrictedHeight - verticalPadding} // un poco de padding arriba y abajo (resta el padding total)
            fill={index === activeSelected ? 'lightblue' : fill}
          />
          <Text
            x={itemSpacing * (index + 1) + itemWidth * index - 10} // -10 para que no toque el borde izquierdo del rectángulo
            y={textY + verticalPadding / 5}
            text={header}
            fontFamily="Arial"
            fontSize={fontSize}
            fill={textColor}
            width={itemWidth + itemSpacing + 2} // + itemSpacing para que no toque el borde derecho del rectángulo y +2 para que no toque el borde izquierdo del rectángulo siguiente
            align="center"
            wrap="none"
            ellipsis={true}
          />
        </Group>
      ))}
    </Group>
  );
});
