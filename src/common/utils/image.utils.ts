import { ShapeModel, Size } from '@/core/model';

export const adjustSizeKeepingAspectRatio = (
  imageSize: Size,
  componentSize: Size
) => {
  const aspectRatio = imageSize.width / imageSize.height;
  const width =
    componentSize.width > imageSize.width
      ? imageSize.width
      : componentSize.width;
  const height =
    componentSize.height > imageSize.height
      ? imageSize.height
      : componentSize.height;
  return {
    width: width,
    height: height / aspectRatio,
  };
};

export const getShapeById = (shapes: ShapeModel[], id: string) => {
  return shapes.find(shape => shape.id === id);
};
