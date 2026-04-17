import { baseTsdownConfig } from '@lemoncode/tsdown-config/base';
import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    ...baseTsdownConfig,
    entry: ['src/index.ts'],
    deps: { neverBundle: ['vscode'] },
  },
  {
    entry: { webview: 'src/webview/main.ts' },
    format: 'iife',
    platform: 'browser',
    outDir: 'dist',
    target: 'es2022',
    sourcemap: true,
    clean: false,
    dts: false,
    deps: { alwaysBundle: /.*/ },
    outputOptions: {
      entryFileNames: '[name].js',
    },
  },
]);
