import express from "express";
import cors from "cors";
import db from "./database/db.js"; // Asegúrate de que la ruta sea correcta
import InmuebleRoutes from "./routes/routes.js";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173' // Permitir peticiones desde el frontend
}));
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON
app.use('/inmuebles', InmuebleRoutes); // Conectar las rutas de inmuebles

// Conectar a la base de datos y sincronizar modelos
const startApp = async () => {
  try {
    await db.authenticate();
    await db.sync(); // Sincroniza modelos con la base de datos
    console.log('Conexión a la base de datos y sincronización completa');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

startApp();

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de HomeFinder');
});

app.listen(8000, () => {
  console.log('Servidor corriendo en http://localhost:8000');
});
