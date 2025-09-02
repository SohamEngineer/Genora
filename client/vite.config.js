import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,       // enables network access (like http://192.168.x.x:5173)
    port: 5173,       // optional: customize the port
    open: true        // optional: auto-open in browser
  }
});
