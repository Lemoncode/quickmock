import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { Group, Image, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { useGroupShapeProps } from '../../mock-components.utils';
import { loadSvgWithFill } from '@/common/utils/svg.utils';
import { useShapeProps } from '@/common/components/shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import {
  calculateFileTreeDynamicSize,
  FileTreeItem,
  parseFileTreeText,
} from './file-tree.business';

const fileTreeShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 220,
  minHeight: 180,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 280,
  defaultHeight: 280,
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

    const treeItems = parseFileTreeText(text);

    const [icons, setIcons] = useState<Record<string, HTMLImageElement | null>>(
      {
        folder: null,
        subfolder: null,
        file: null,
      }
    );

    const iconWidth = 50;
    const elementHeight = 60;
    const paddingX = 40;
    const paddingY = 30;
    const iconTextSpacing = 10;
    const indentationStep = 10;

    const restrictedSize = calculateFileTreeDynamicSize(treeItems, {
      width,
      height,
      elementHeight,
      paddingY,
      baseRestrictions: fileTreeShapeRestrictions,
    });

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
      return (
        paddingX +
        item.level * indentationStep +
        (item.type === 'file' ? 40 : 0)
      );
    };

    const calculateTextX = (item: FileTreeItem) => {
      return calculateIconX(item) + iconWidth + iconTextSpacing;
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
                width={iconWidth}
                height={iconWidth}
              />
            )}
            <Text
              x={calculateTextX(item)}
              y={paddingY + elementHeight * index + 20}
              text={item.text}
              width={calculateAvailableWidth(item)}
              height={elementHeight}
              fontFamily={BASIC_SHAPE.DEFAULT_FONT_FAMILY}
              fontSize={15}
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
