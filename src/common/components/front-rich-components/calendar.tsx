import { useState, forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeSizeRestrictions } from '@/core/model';
import { ShapeProps } from '../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';

const calendarShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 350,
  minHeight: 350,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 500,
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

    const [currentDate, setCurrentDate] = useState(new Date());

    const getCurrentMonthDays = (date: Date) => {
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const daysInMonth = new Date(year, date.getMonth() + 1, 0).getDate();
      const startDay = new Date(year, date.getMonth(), 1).getDay();

      const days = [];
      let week = new Array(startDay).fill(null); // Fill the first week with nulls up to the start day

      for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7 || day === daysInMonth) {
          days.push(week);
          week = [];
        }
      }

      return { month, year, days };
    };

    const handlePrevMonth = () => {
      setCurrentDate(
        prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
      );
    };

    const handleNextMonth = () => {
      setCurrentDate(
        prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
      );
    };

    const { month, year, days } = getCurrentMonthDays(currentDate);

    const margin = 10;
    const headerHeight = 50;
    const dayBoxWidth = (restrictedWidth - margin * 2) / 7;
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
          width={restrictedWidth}
          height={headerHeight}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Flecha izquierda */}
        <Line
          points={[
            margin + 20,
            margin + 10,
            margin + 10,
            margin + 20,
            margin + 20,
            margin + 30,
          ]}
          closed
          fill="black"
          stroke="black"
          strokeWidth={2}
          onClick={handlePrevMonth}
          cursor="pointer"
        />

        {/* Year and month */}
        {/*          x={width / 2 - 50}*/}
        <Text
          x={0}
          y={headerHeight / 3}
          text={`${month} ${year}`}
          width={restrictedWidth}
          fontFamily="Comic Sans MS, cursive"
          fontSize={20}
          fill="black"
          align="center"
          ellipsis={true}
        />

        {/* Right arrow */}
        <Line
          points={[
            restrictedWidth - margin - 30,
            margin + 10,
            restrictedWidth - margin - 20,
            margin + 20,
            restrictedWidth - margin - 30,
            margin + 30,
          ]}
          closed
          fill="black"
          stroke="black"
          strokeWidth={2}
          onClick={handleNextMonth}
          cursor="pointer"
        />

        {/* Calendar table */}
        <Rect
          x={0}
          y={headerHeight + 10}
          width={restrictedWidth}
          height={height - headerHeight + 20}
          cornerRadius={10}
          stroke="black"
          strokeWidth={2}
          fill="white"
        />

        {/* Week days */}
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <Text
            key={i}
            x={35 + i * dayBoxWidth}
            y={headerHeight + 20}
            text={day}
            fontFamily="Comic Sans MS, cursive"
            fontSize={16}
            fill="black"
          />
        ))}

        {/* Month days */}
        {days.map((week: any[], rowIndex: number) =>
          week.map((day, colIndex) => (
            <Text
              key={`${rowIndex}-${colIndex}`}
              x={35 + colIndex * dayBoxWidth}
              y={headerHeight + 70 + rowIndex * dayBoxHeight}
              text={day ? day.toString() : ''}
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
