import { forwardRef, useEffect, useRef, useState } from 'react';
import { Group, Image as KonvaImage } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes/shape-restrictions';
import { useGroupShapeProps } from '../../mock-components.utils';
import html2canvas from 'html2canvas';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { useShapeProps } from '../../../shapes/use-shape-props.hook';
import { parseTextWithFormatting } from './rich-text.utils';

const richTextSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 10,
  minHeight: 10,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 200,
  defaultHeight: 100,
};

export const getRichTextSizeRestrictions = (): ShapeSizeRestrictions =>
  richTextSizeRestrictions;

const shapeType: ShapeType = 'richtext';

export const RichTextShape = forwardRef<any, ShapeProps>((props, ref) => {
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
    richTextSizeRestrictions,
    width,
    height
  );
  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

  const { textColor, fontSize, textAlignment } = useShapeProps(
    otherProps,
    BASIC_SHAPE
  );

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );

  const [imageData, setImageData] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef<any>(null);

  const generateImage = (text: string, width: number, height: number) => {
    const domElement = document.createElement('div');
    domElement.style.width = `${width}px`;
    domElement.style.height = `${height}px`;
    domElement.style.fontSize = `${fontSize}px`;
    domElement.style.color = textColor;
    domElement.style.textAlign = textAlignment;
    domElement.style.textWrap = 'wrap';
    domElement.style.fontFamily = BASIC_SHAPE.DEFAULT_FONT_FAMILY;
    domElement.innerHTML = parseTextWithFormatting(text);
    document.body.appendChild(domElement);

    html2canvas(domElement, {
      backgroundColor: 'rgba(0,0,0,0)',
    }).then(canvas => {
      const image = new window.Image();
      image.src = canvas.toDataURL();

      image.onload = () => {
        setImageData(image);
      };

      document.body.removeChild(domElement);
    });
  };

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      generateImage(text, restrictedWidth, restrictedHeight);
    }, 250);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [
    text,
    restrictedWidth,
    restrictedHeight,
    textColor,
    fontSize,
    textAlignment,
  ]);

  return (
    <Group {...commonGroupProps} {...shapeProps}>
      {imageData && (
        <KonvaImage
          ref={imageRef}
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          image={imageData}
        />
      )}
    </Group>
  );
});

export default RichTextShape;
