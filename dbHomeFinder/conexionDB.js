import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; // Middleware para permitir peticiones desde el frontend
import { pool } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

// Ajusta la ruta para servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname, '..', '..', '..')));

app.get('*', (req, res) => {
  // Ajusta la ruta para enviar el archivo index.html desde la raíz del proyecto
  res.sendFile(path.join(__dirname, '..', '..', '..', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
