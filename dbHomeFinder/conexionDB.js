import express from 'express';
import cors from 'cors'; // Middleware para permitir peticiones desde el frontend
import { pool } from './database.js';

const app = express();
const PORT = process.env.PORT || 5000; 

// Middleware para permitir solicitudes de otros dominios (CORS)
app.use(cors());
app.use(express.json()); // Para manejar JSON en las solicitudes

// Endpoint para obtener todos los inmuebles
app.get('/api/inmuebles', async (req, res) => {
    try {
        // Hacemos una consulta a la base de datos
        const result = await pool.query('SELECT * FROM properties'); 
        res.json(result.rows); // Devolvemos los resultados como JSON
    } catch (error) {
        console.error('Error al obtener los inmuebles:', error);
        res.status(500).send('Error en el servidor');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
