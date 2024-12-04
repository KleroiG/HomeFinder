import express, { Request, Response, NextFunction } from "express";
import propertyRouter from "./routes/Propertyrouter"; // Rutas para inmuebles
import userRouter from "./routes/userRoutes"; // Rutas para usuarios
import db from "./config/db";
import colors from "colors";
import cors from "cors";

// Conectar a base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Conexion exitosa a la base de datos"));
  } catch (error) {
    console.log(colors.red.bold("Hubo un error al conectar a la base de datos"));
    console.error(error);
  }
}

connectDB();

// Instancia de express
const server = express();

// Habilitar CORS para todas las rutas
server.use(cors({ origin: "http://localhost:5173" }));

// Leer datos de formularios
server.use(express.json());

// Middleware para logging (opcional, útil para desarrollo)
server.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Separar rutas de inmuebles y usuarios
server.use("/api/inmuebles", propertyRouter); // Rutas para inmuebles
server.use("/api/users", userRouter); // Rutas para usuarios

// Middleware para manejar errores
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

// Manejar rutas inexistentes
server.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

export default server;
