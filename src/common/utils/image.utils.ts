import { ShapeModel, Size } from '@/core/model';

export const adjustSizeKeepingAspectRatio = (
  imageSize: Size,
  componentSize: Size
) => {
  const aspectRatio = imageSize.width / imageSize.height;

  // If the image is smaller than the component in both dimensions, keep its original size
  if (
    imageSize.width <= componentSize.width &&
    imageSize.height <= componentSize.height
  ) {
    return {
      width: imageSize.width,
      height: imageSize.height,
    };
  }

  // Adjust the size based on the component's width
  let newWidth = componentSize.width;
  let newHeight = newWidth / aspectRatio;

  // If the new height exceeds the component's height, adjust the size based on the height
  if (newHeight > componentSize.height) {
    newHeight = componentSize.height;
    newWidth = newHeight * aspectRatio;
  }

  return {
    width: newWidth,
    height: newHeight,
  };
};

export const getShapeById = (shapes: ShapeModel[], id: string) => {
  return shapes.find(shape => shape.id === id);
};
