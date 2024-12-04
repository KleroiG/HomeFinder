import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: 'https://homefinder-qz04.onrender.com',
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173, // Asegúrate de que el puerto sea configurable
  },
  build: { 
    outDir: 'dist', // Carpeta de salida 
    },
});