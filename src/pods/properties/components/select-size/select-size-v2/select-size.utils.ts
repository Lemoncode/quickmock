import { ElementSize, SizeConfig } from '@/core/model';

export const sizeToStep = (config: SizeConfig, size: string): string => {
  const index = config.availableSizes.indexOf(size as ElementSize);
  return index >= 0 ? (index + 1).toString() : '1';
};

export const stepToSize = (config: SizeConfig, step: string): ElementSize => {
  const index = parseInt(step) - 1;
  return config.availableSizes[index] || config.availableSizes[0];
};
