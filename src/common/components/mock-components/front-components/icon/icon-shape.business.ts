import { IconSize } from '@/core/model';

export const loadSvgWithFill = async (url: string, fillColor: string) => {
  const response = await fetch(url);
  const svgText = await response.text();

  const modifiedSvg = svgText.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);

  const svgBlob = new Blob([modifiedSvg], { type: 'image/svg+xml' });
  const objectURL = URL.createObjectURL(svgBlob);

  const img = new window.Image();
  img.src = objectURL;

  return img;
};

export const returnIconSize = (iconSize: IconSize): number[] => {
  switch (iconSize) {
    case 'XS':
      return [25, 25];
    case 'S':
      return [50, 50];
    case 'M':
      return [100, 100];
    case 'L':
      return [125, 125];
    case 'XL':
      return [150, 150];
    default:
      return [50, 50];
  }
};
