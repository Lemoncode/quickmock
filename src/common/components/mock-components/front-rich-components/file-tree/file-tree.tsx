import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { Group, Image, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { useGroupShapeProps } from '../../mock-components.utils';
import { loadSvgWithFill } from '@/common/utils/svg.utils';
import { useShapeProps } from '@/common/components/shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import {
  calculateFileTreeDynamicSize,
  getFileTreeSizeValues,
  parseFileTreeText,
} from './file-tree.business';
import { useFileTreeResize } from './file-tree-resize.hook';
import { FileTreeItem } from './file-tree.model';

const fileTreeShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 150,
  minHeight: 50,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 230,
  defaultHeight: 180,
};

interface FileTreeShapeProps extends ShapeProps {
  text: string;
}

const shapeType: ShapeType = 'fileTree';

export const getFileTreeShapeSizeRestrictions = (): ShapeSizeRestrictions =>
  fileTreeShapeRestrictions;

export const FileTreeShape = forwardRef<any, FileTreeShapeProps>(
  (props, ref) => {
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

    const treeItems = useMemo(() => {
      return parseFileTreeText(text);
    }, [text]);

    const [icons, setIcons] = useState<Record<string, HTMLImageElement | null>>(
      {
        folder: null,
        subfolder: null,
        file: null,
      }
    );

    const {
      fontSize,
      iconDimension,
      elementHeight,
      extraTextTopPadding,
      paddingX,
      paddingY,
      iconTextSpacing,
      indentationStep,
    } = useMemo(
      () => getFileTreeSizeValues(otherProps?.size),
      [otherProps?.size]
    );

    const restrictedSize = calculateFileTreeDynamicSize(treeItems, {
      width,
      height,
      elementHeight,
      paddingY,
      paddingX,
      iconDimension,
      indentationStep,
      baseRestrictions: fileTreeShapeRestrictions,
    });

    useFileTreeResize(
      id,
      { x, y },
      text,
      { width, height },
      restrictedSize,
      fileTreeShapeRestrictions.minHeight,
      treeItems,
      {
        fontSize,
        iconDimension,
        elementHeight,
        extraTextTopPadding,
        paddingX,
        paddingY,
        iconTextSpacing,
        indentationStep,
      },
      otherProps?.size
    );

    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const { stroke, strokeStyle, fill, textColor, borderRadius } =
      useShapeProps(otherProps, BASIC_SHAPE);

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    // Helper functions for position calculations
    const calculateIconX = (item: FileTreeItem) => {
      return paddingX + item.level * indentationStep;
    };

    const calculateTextX = (item: FileTreeItem) => {
      return calculateIconX(item) + iconDimension + iconTextSpacing;
    };

    const calculateAvailableWidth = (item: FileTreeItem) => {
      return restrictedWidth - calculateTextX(item) - paddingX;
    };

    useEffect(() => {
      Promise.all([
        loadSvgWithFill('/icons/folder.svg', stroke),
        loadSvgWithFill('/icons/open.svg', stroke),
        loadSvgWithFill('/icons/new.svg', stroke),
      ]).then(([folder, subfolder, file]) => {
        setIcons({
          folder,
          subfolder,
          file,
        });
      });
    }, [stroke]);

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Container */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
          dash={strokeStyle}
          cornerRadius={borderRadius}
        />

        {treeItems.map((item, index) => (
          <Group key={index}>
            {icons[item.type] && (
              <Image
                image={icons[item.type]!}
                x={calculateIconX(item)}
                y={paddingY + elementHeight * index}
                width={iconDimension}
                height={iconDimension}
              />
            )}
            <Text
              x={calculateTextX(item)}
              y={paddingY + elementHeight * index + extraTextTopPadding}
              text={item.text}
              width={calculateAvailableWidth(item)}
              height={elementHeight}
              fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
              fontSize={fontSize}
              fill={textColor}
              wrap="none"
              ellipsis={true}
            />
          </Group>
        ))}
      </Group>
    );
  }
);
