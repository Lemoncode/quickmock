import { IconSize } from '@/core/model';

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
