import { IconSize } from '@/core/model';

export const sizeToSteps = (size: IconSize): string => {
  switch (size) {
    case 'XS':
      return '1';
    case 'S':
      return '2';
    case 'M':
      return '3';
    case 'L':
      return '4';
    case 'XL':
      return '5';
    default:
      return '2';
  }
};

export const stepsToSize = (step: string): IconSize => {
  switch (step) {
    case '1':
      return 'XS';
    case '2':
      return 'S';
    case '3':
      return 'M';
    case '4':
      return 'L';
    case '5':
      return 'XL';
    default:
      return 'S';
  }
};
