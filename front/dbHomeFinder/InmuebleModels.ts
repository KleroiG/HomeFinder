import db from "./db" // Asegúrate de que la ruta sea correcta
import { DataTypes, Model, Optional } from "sequelize"

// Definir tipos para las propiedades del modelo
interface InmuebleAttributes {
  id: number
  nombre: string
  direccion: string
  precio: number
  descripcion?: string
  imagenUrl?: string
  createdAt?: Date
  updatedAt?: Date
}

const InmuebleModels = db.define<
  Model<InmuebleAttributes, Optional<InmuebleAttributes, "id">>
>(
  "inmuebles",
  {
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
  },
  {
    // Opciones del modelo
    timestamps: true, // Agrega campos `createdAt` y `updatedAt`
  }
)

export default InmuebleModels
