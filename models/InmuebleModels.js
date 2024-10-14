import db from "../database/db.js"; // Asegúrate de que la ruta sea correcta
import { DataTypes } from "sequelize";

const InmuebleModels = db.define('inmuebles', {
    // Campos del modelo
    nombre: {
        type: DataTypes.STRING,
        allowNull: false, // Campo obligatorio
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false, // Campo obligatorio
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false, // Campo obligatorio
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true, // Campo opcional
    },
    imagenUrl: {
        type: DataTypes.STRING,
        allowNull: true, // Campo opcional
    },
}, {
    // Opciones del modelo
    timestamps: true, // Agrega campos `createdAt` y `updatedAt`
});

export default InmuebleModels;
