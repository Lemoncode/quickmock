import { useState, forwardRef } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../../front-components/shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import {
  calculateNextMonth,
  calculatePreviousMonth,
  getCurrentMonthDays,
} from './calendar.business';
import { useShapeComponentSelection } from '../../shapes/use-shape-selection.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';

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

const shapeType: ShapeType = 'calendar';

export const CalendarShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const { width: restrictedWidth, height: restrictedHeight } =
    fitSizeToShapeSizeRestrictions(
      calendarShapeSizeRestrictions,
      width,
      height
    );

  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prevDate => calculatePreviousMonth(prevDate));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => calculateNextMonth(prevDate));
  };

  const { month, year, days } = getCurrentMonthDays(currentDate);

  const margin = 10;
  const headerHeight = 50;
  const dayBoxWidth = (restrictedWidth - margin * 2) / 7;
  const dayBoxHeight = (height - headerHeight) / days.length;

  const { handleSelection } = useShapeComponentSelection(props, shapeType);

  return (
    <Group
      x={x}
      y={y}
      ref={ref}
      width={restrictedWidth}
      height={restrictedHeight}
      {...shapeProps}
      onClick={handleSelection}
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

      {/* Left arrow  */}
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

      <Text
        x={margin + 20}
        y={headerHeight / 3}
        text={`${month} ${year}`}
        width={restrictedWidth - margin - 20 - margin - 30}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
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
          fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
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
            fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
            fontSize={16}
            fill="black"
          />
        ))
      )}
    </Group>
  );
});

export default CalendarShape;
