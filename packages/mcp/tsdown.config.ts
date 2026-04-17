import { baseTsdownConfig } from '@lemoncode/tsdown-config/base';

export default {
  ...baseTsdownConfig,
  entry: ['src/index.ts'],
  deps: {
    neverBundle: ['puppeteer', 'puppeteer-core'],
    alwaysBundle: /.*/,
  },
};
