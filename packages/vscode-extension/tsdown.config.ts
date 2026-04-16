import { baseTsdownConfig } from '@lemoncode/tsdown-config/base';

export default {
  ...baseTsdownConfig,
  entry: ['src/index.ts'],
  external: ['vscode'],
};
