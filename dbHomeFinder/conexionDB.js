import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4173;

// Servir archivos estáticos desde la carpeta 'dist'
app.use(express.static(path.join(__dirname, '..', 'dist')));

// Rutas para manejar cualquier solicitud y devolver el archivo index.html
// Esto es para asegurarse de que todas las rutas se manejen por React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});