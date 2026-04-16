import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: './index.html',
        editor: './editor.html',
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
