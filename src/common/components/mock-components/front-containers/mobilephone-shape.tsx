import { forwardRef, useEffect, useState } from 'react';
import { Group, Rect, Circle, Image, Text } from 'react-konva';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { ShapeProps } from '../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../mock-components.utils';
import { loadSvgWithFill } from '@/common/utils/svg.utils';
import { BASIC_SHAPE } from '../front-components/shape.const';

const mobilePhoneShapeSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 150,
  maxWidth: 1000,
  maxHeight: 1000,
  defaultWidth: 300,
  defaultHeight: 560,
};

export const getMobilePhoneShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  mobilePhoneShapeSizeRestrictions;

const shapeType: ShapeType = 'mobilePhone';

export const MobilePhoneShape = forwardRef<any, ShapeProps>((props, ref) => {
  const { x, y, width, height, id, onSelected, ...shapeProps } = props;
  const restrictedSize = fitSizeToShapeSizeRestrictions(
    mobilePhoneShapeSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const margin = 5;
  const screenMargin = 10;
  const speakerPadding = 10;
  const buttonPadding = 10;
  const speakerWidth = 20;
  const speakerHeight = 5;
  const speakerRadius = 2;
  const buttonRadius = 9;

  const [wifiIcon, setWifiIcon] = useState<HTMLImageElement | null>(null);
  const [batteryIcon, setBatteryIcon] = useState<HTMLImageElement | null>(null);
  const [signalIcon, setSignalIcon] = useState<HTMLImageElement | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  const adornerIconSize = 20;
  const adornerPadding = 5;
  const adornerTotalWidth = adornerIconSize * 3 + 17 * 2 + 30;

  // Calculate inner screen coordinates (excluding frame margins)
  const screenX = margin + screenMargin; // Left edge of inner screen
  const screenY = screenMargin * 3; // Top edge of inner screen
  const screenWidth = restrictedWidth - 2 * margin - 2 * screenMargin; // Available width inside screen

  // Position adorner in top-right corner of inner screen
  const adornerStartX = screenX + screenWidth - adornerTotalWidth; // Right-aligned positioning
  const adornerY = screenY + adornerPadding; // Top-aligned with padding

  // Individual icon positions within the adorner
  const wifiX = adornerStartX;
  const signalX = adornerStartX + 17;
  const batteryX = adornerStartX + 20 * 2;

  const timeX = adornerStartX + 23 * 3;
  const timeY = adornerY + 4;
  const timeWidth = 40;

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  useEffect(() => {
    loadSvgWithFill('/icons/wifi.svg', 'black').then(img => setWifiIcon(img));
    loadSvgWithFill('/icons/cellsignal.svg', 'black').then(img =>
      setSignalIcon(img)
    );
    loadSvgWithFill('/icons/batteryfull.svg', 'black').then(img =>
      setBatteryIcon(img)
    );
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {/* Mobile Frame */}
      <Rect
        x={0}
        y={0}
        width={restrictedWidth}
        height={restrictedHeight}
        cornerRadius={30}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />

      {/* Mobile Screen */}
      <Rect
        x={margin + screenMargin}
        y={screenMargin * 3}
        width={restrictedWidth - 2 * margin - 2 * screenMargin}
        height={restrictedHeight - 2 * margin - 6 * screenMargin}
        cornerRadius={10}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* LoudSpeaker */}
      <Rect
        x={(restrictedWidth - speakerWidth) / 2}
        y={speakerPadding}
        width={speakerWidth}
        height={speakerHeight}
        cornerRadius={speakerRadius}
        stroke="black"
        strokeWidth={1}
        fill="white"
      />

      {/* Adorner */}

      {/* Wifi */}
      {wifiIcon && (
        <Image
          image={wifiIcon}
          x={wifiX}
          y={adornerY - 2}
          width={adornerIconSize}
          height={adornerIconSize}
        />
      )}

      {/* Cell signal */}
      {signalIcon && (
        <Image
          image={signalIcon}
          x={signalX}
          y={adornerY}
          width={adornerIconSize}
          height={adornerIconSize}
        />
      )}

      {/* Battery */}
      {batteryIcon && (
        <Image
          image={batteryIcon}
          x={batteryX}
          y={adornerY}
          width={adornerIconSize}
          height={adornerIconSize}
        />
      )}

      {/* Current time */}
      <Text
        x={timeX}
        y={timeY}
        width={timeWidth}
        height={adornerIconSize}
        text={currentTime}
        fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
        fontSize={14}
        wrap="none"
      />

      {/* Init button */}
      <Circle
        x={restrictedWidth / 2}
        y={restrictedHeight - margin - buttonPadding}
        radius={buttonRadius}
        stroke="black"
        strokeWidth={2}
        fill="white"
      />
    </Group>
  );
});

export default MobilePhoneShape;
