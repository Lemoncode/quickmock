/*import { forwardRef} from "react";
import { Text, Group } from "react-konva";
import { ShapeType } from "@/core/model";
import { ShapeSizeRestrictions } from "@/core/model";
import { BASIC_SHAPE } from '../front-components/shape.const';
import { ShapeProps } from "../shape.model";
import { fitSizeToShapeSizeRestrictions } from "@/common/utils/shapes";
import { useShapeProps } from "../../shapes/use-shape-props.hook";
import { useGroupShapeProps } from "../mock-components.utils";

interface LineSegment {
  text: string;
  bold: boolean;
  italic: boolean;
}

export const richTextParagraphSizeRestrictions: ShapeSizeRestrictions = {
  minWidth: 200,
  minHeight: 70,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 420,
  defaultHeight: 260,
};

export const getRichTextParagraphSizeRestrictions = (): ShapeSizeRestrictions=> 
  richTextParagraphSizeRestrictions;

const shapeType: ShapeType = 'richTextParagraph';

export const RichTextParagraphShape = forwardRef<any,ShapeProps>(( props, ref ) => {
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

  const extractBoldSegments = (text: string): LineSegment[] => {
    const segments: LineSegment[] = [];
    let bold = false;
    let italic = false;
    let buffer = "";

    for (let i = 0; i < text.length; i++) {
      const word = text[i];
      if (word === "*") {
        bold= true;
        if (bold) {
          segments.push({ text: buffer, bold: true, italic: false });
          buffer = "";
          bold = false;
        } else {
          if (buffer) segments.push({ text: buffer, bold: false, italic: false });
          buffer = "";
          bold = true;
        }
      } else if (text[i] === "_") {
        italic= true;
        if (italic) {
          segments.push({ text: buffer, bold: false, italic: true });
          buffer = "";
          italic = false;
        } else {
          if (buffer) segments.push({ text: buffer, bold: false, italic: false });
          buffer = "";
          italic = true;
        }
      } else {
        buffer += text[i];
      }
    }

    if (buffer) {
      segments.push({ text: buffer, bold, italic });
    }
    return segments;
  };
  
  // Agrupar texto sin cortar palabras
  const wrapTextWithSegments = (
    segments: LineSegment[],
    maxWidth: number,
    font: string
  ): LineSegment[][] => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return [];
  
    context.font = font; 
  
    let currentLine: LineSegment[] = [];
    const result: LineSegment[][] = [];
    let lineWidth = 0;
  
    segments.forEach(segment => {
      const { text, bold, italic } = segment;
  
      // Adjust font style for bold or italic
      if (bold && italic) context.font = `italic bold ${font}`;
      else if (bold) context.font = `bold ${font}`;
      else if (italic) context.font = `italic ${font}`;
      else context.font = font;
  
      text.split(" ").forEach(word => {
        const wordWidth = context.measureText(word + " ").width;
  
        if (lineWidth + wordWidth > maxWidth) {
          // Push current line to result and start a new line
          result.push(currentLine);
          currentLine = [];
          lineWidth = 0;
        }
  
        // Add word to current line
        currentLine.push({ text: word, bold, italic });
        lineWidth += wordWidth;
      });
    });
  
    if (currentLine.length > 0) {
      result.push(currentLine);
    }
  
    return result;
  };

  const restrictedSize = fitSizeToShapeSizeRestrictions(
    richTextParagraphSizeRestrictions,
    width,
    height
  );

  const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;
  
  const { textColor } = useShapeProps(otherProps, BASIC_SHAPE);

  const commonGroupProps = useGroupShapeProps(
    props,
    restrictedSize,
    shapeType,
    ref
  );
    const lines = extractBoldSegments(text);
    const wrappedLines = wrapTextWithSegments(lines, restrictedWidth, "16 px Arial" );

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {lines.map((lineObj, lineIndex) => {
          let currentX = 0; // Coordenada horizontal inicial para cada línea
          const currentY = y + lineIndex * lineHeight; // Coordenada vertical de la línea
  
          return (
            <Group key={lineIndex}>
              {lineObj.line.map((segment, segmentIndex) => {
                const fontWeight = segment.bold ? "bold" : "normal";
                const fontStyle = segment.italic ? "italic" : "normal";
                const wordWidth = context.measureText(segment.text).width;
                currentX += wordWidth;
                return (
                  <Text
                    key={`${lineIndex}-${segmentIndex}`}
                    x={x + currentX} // Posición horizontal acumulada
                    y={currentY} // Posición vertical para la línea actual
                    text={segment.text}
                    fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
                    fontSize={14}
                    fill={textColor}
                    fontWeight={fontWeight}
                    fontStyle={fontStyle}
                    align="left"
                    verticalAlign="top"
                    wrap="none"
                  />
                );
              })}
            </Group>
          );
        })}
      </Group>
    );
  }); */
