import { baseVitestConfig } from '@lemoncode/vitest-config/base';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { configDefaults, mergeConfig } from 'vitest/config';

export default mergeConfig(baseVitestConfig, {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    include: ['./src/**/*.spec.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
