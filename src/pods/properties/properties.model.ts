import { IconInfo, OtherProps } from '@/core/model';

export const multiSelectEnabledProperties: (keyof OtherProps)[] = [
  'stroke',
  'backgroundColor',
  'textColor',
  'selectedBackgroundColor',
  'strokeStyle',
  'fontVariant',
  'fontStyle',
  'fontSize',
  'textDecoration',
  'checked',
  'icon',
  'iconSize',
  'imageBlackAndWhite',
  'progress',
  'borderRadius',
  'selectedBackgroundColor',
  'textAlignment',
  'disabled',
];

export type PropsValueTypes =
  | string
  | number
  | boolean
  | number[]
  | IconInfo
  | undefined;

export interface CommonSelectedPropsAndValues {
  [key: string]: PropsValueTypes;
}
