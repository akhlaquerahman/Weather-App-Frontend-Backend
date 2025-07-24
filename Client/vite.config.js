import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 this line is important
    port: 5173 // optional: you can also specify a fixed port
  }
});
