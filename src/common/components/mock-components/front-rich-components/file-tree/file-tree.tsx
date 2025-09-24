import { ShapeSizeRestrictions, ShapeType } from '@/core/model';
import { forwardRef, useEffect, useState } from 'react';
import { Group, Image, Rect, Text } from 'react-konva';
import { ShapeProps } from '../../shape.model';
import { fitSizeToShapeSizeRestrictions } from '@/common/utils/shapes';
import { useGroupShapeProps } from '../../mock-components.utils';
import { loadSvgWithFill } from '@/common/utils/svg.utils';
import { useShapeProps } from '@/common/components/shapes/use-shape-props.hook';
import { BASIC_SHAPE } from '../../front-components/shape.const';
import { joinTextContent } from './file-tree.business';

const fileTreeShapeRestrictions: ShapeSizeRestrictions = {
  minWidth: 220,
  minHeight: 280,
  maxWidth: -1,
  maxHeight: -1,
  defaultWidth: 280,
  defaultHeight: 280,
};

interface FileTreeShapeProps extends ShapeProps {
  text: string;
}

type IconType = 'folder' | 'subfolder' | 'file';

interface IconState {
  type: IconType;
  value: HTMLImageElement | null;
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

    const treeTitles = joinTextContent(text);

    const [icons, setIcons] = useState<IconState[]>([
      { type: 'folder', value: null },
      { type: 'subfolder', value: null },
      { type: 'file', value: null },
      { type: 'folder', value: null },
    ]);

    const restrictedSize = fitSizeToShapeSizeRestrictions(
      fileTreeShapeRestrictions,
      width,
      height
    );
    const { width: restrictedWidth, height: restrictedHeight } = restrictedSize;

    const iconWidth = 50;
    const elementHeight = 60;
    const paddingLeft = 40;
    const paddingTop = 30;
    const fileX = 50 + paddingLeft;
    const iconTextSpacing = 10;

    const folderTextX = iconWidth + iconTextSpacing + paddingLeft;
    const fileTextX = fileX + iconWidth + iconTextSpacing;

    const folderAvailableWidth = restrictedWidth - folderTextX;
    const fileAvailableWidth = restrictedWidth - fileTextX;

    const { stroke, strokeStyle, fill, textColor, borderRadius } =
      useShapeProps(otherProps, BASIC_SHAPE);

    const commonGroupProps = useGroupShapeProps(
      props,
      restrictedSize,
      shapeType,
      ref
    );

    useEffect(() => {
      Promise.all([
        loadSvgWithFill('/icons/folder.svg', 'black'),
        loadSvgWithFill('/icons/open.svg', 'black'),
        loadSvgWithFill('/icons/new.svg', 'black'),
      ]).then(([folder, subfolder, file]) => {
        setIcons([
          { type: 'folder', value: folder },
          { type: 'subfolder', value: subfolder },
          { type: 'file', value: file },
          { type: 'folder', value: folder },
        ]);
      });
    }, []);

    return (
      <Group {...commonGroupProps} {...shapeProps}>
        {/* Container */}
        <Rect
          x={0}
          y={0}
          width={restrictedWidth}
          height={restrictedHeight + 20}
          stroke={stroke}
          strokeWidth={2}
          fill={fill}
          dash={strokeStyle}
          cornerRadius={borderRadius}
        />

        {treeTitles.map((title, index) => (
          <Group key={index}>
            {icons[index]?.value && (
              <Image
                image={icons[index].value}
                x={icons[index].type === 'file' ? fileX : paddingLeft}
                y={paddingTop + elementHeight * index}
                width={iconWidth}
                height={iconWidth}
              />
            )}
            <Text
              x={icons[index].type === 'file' ? fileTextX : folderTextX}
              y={paddingTop + elementHeight * index + 20}
              text={title}
              width={
                icons[index].type === 'file'
                  ? fileAvailableWidth
                  : folderAvailableWidth
              }
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
