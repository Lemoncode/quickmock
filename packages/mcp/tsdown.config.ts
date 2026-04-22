import { baseTsdownConfig } from '@lemoncode/tsdown-config/base';

export default {
  ...baseTsdownConfig,
  entry: ['src/index.ts'],
  // Add a shebang so the built file can run as an npm bin (npx @lemoncode/quickmock-mcp).
  outputOptions: {
    banner: '#!/usr/bin/env node',
  },
};
