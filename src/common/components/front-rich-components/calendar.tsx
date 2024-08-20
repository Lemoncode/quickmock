import { Group, Rect, Circle, Line, Text } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { forwardRef } from 'react';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const calendarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 600,
  defaultHeight: 500,
};

export const getCalendarShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  calendarShapeSizeRestrictions;

export const CalendarShape = forwardRef<any, ShapeProps>(
  ({ x, y, width, height, id, onSelected, ...shapeProps }, ref) => {
    const { width: restrictedWidth, height: restrictedHeight } =
      fitSizeToShapeSizeRestrictions(
        calendarShapeSizeRestrictions,
        width,
        height
      );

    const month = 'January';
    const year = 2021;
    const days = [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31],
    ];

    const margin = 10;
    const headerHeight = 50;
    const dayBoxHeight = (height - headerHeight) / days.length;

    return (
      <Group
        x={x}
        y={y}
        ref={ref}
        width={restrictedWidth}
        height={restrictedHeight}
        {...shapeProps}
        onClick={() => onSelected(id, 'calendar')}
      >
        {/* Encabezado del calendario */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={headerHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Flecha izquierda */}
        <Line
          points={[
            margin + 15,
            restrictedHeight - headerHeight - 5,
            margin + 35,
            restrictedHeight - headerHeight + 10,
            margin + 15,
            restrictedHeight - headerHeight + 25,
          ]}
          fill="black"
          closed={true}
        />

        {/* Mes y Año */}
        <Text
          x={width / 2 - 50}
          y={headerHeight / 3}
          text={`${month} ${year}`}
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill="black"
        />

        {/* Flecha derecha */}
        <Line
          points={[
            margin + 15,
            restrictedHeight - headerHeight - 5,
            margin + 35,
            restrictedHeight - headerHeight + 10,
            margin + 15,
            restrictedHeight - headerHeight + 25,
          ]}
          fill="black"
          closed={true}
        />

        {/* Tabla del calendario */}
        <Rect
          x={0}
          y={headerHeight + 10}
          width={width}
          height={height - headerHeight + 20}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Días de la semana */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <Text
            key={i}
            x={35 + i * (width / 7)}
            y={headerHeight + 20}
            text={day}
            fontFamily="Comic Sans MS, cursive"
            fontSize={16}
            fill="black"
          />
        ))}

        {/* Días del mes */}
        {days.map((week: any[], rowIndex: number) =>
          week.map((day, colIndex) => (
            <Text
              key={`${rowIndex}-${colIndex}`}
              x={35 + colIndex * (width / 7)}
              y={headerHeight + 70 + rowIndex * dayBoxHeight}
              text={day.toString()}
              fontFamily="Comic Sans MS, cursive"
              fontSize={16}
              fill="black"
            />
          ))
        )}
      </Group>
    );
  }
);

export default CalendarShape;
