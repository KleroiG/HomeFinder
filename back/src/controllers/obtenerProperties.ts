import { Request, Response } from "express";
import { Property } from "./Property";
import { Op } from "sequelize";


export const crearProperty = async (req: Request, res: Response) => {
    try {
      const { propietario_id, titulo, descripcion, ubicacion, precio, disponibilidad, imagen_url } = req.body;
      
      const nuevoInmueble = await Property.create({
        propietario_id,
        titulo,
        descripcion,
        ubicacion,
        precio,
        disponibilidad,
        imagen_url,
        creado_en: new Date(), // Establece la fecha de creación
      });
  
      res.status(201).json(nuevoInmueble);
    } catch (error) {
      console.error("Error al crear propiedad:", error);
      res.status(500).json({ message: "Hubo un error al crear la propiedad" });
    }
  };

  export const obtenerProperties = async (req: Request, res: Response) => {
    try {
      const inmuebles = await Property.findAll(); // Obtiene los inmuebles de la base de datos
      res.json(inmuebles); // Devuelve los inmuebles como respuesta JSON
    } catch (error) {
      console.error('Error al obtener inmuebles:', error);
      res.status(500).json({ error: 'Error al obtener los inmuebles' });
    }
  };
export const obtenerPropertyPorId = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const propiedad = await Property.findByPk(id); // Buscar propiedad por ID
  
      if (propiedad) {
        res.status(200).json(propiedad);
      } else {
        res.status(404).json({ message: "Propiedad no encontrada" });
      }
    } catch (error) {
      console.error("Error al obtener propiedad:", error);
      res.status(500).json({ message: "Hubo un error al obtener la propiedad" });
    }
};

export const actualizarProperty = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { propietario_id, titulo, descripcion, ubicacion, precio, disponibilidad, imagen_url } = req.body;
  
      const propiedad = await Property.findByPk(id); // Buscar propiedad por ID
        
      if (propiedad) {
        // Actualiza los campos de la propiedad
        propiedad.propietario_id = propietario_id || propiedad.propietario_id;
        propiedad.titulo = titulo || propiedad.titulo;
        propiedad.descripcion = descripcion || propiedad.descripcion;
        propiedad.ubicacion = ubicacion || propiedad.ubicacion;
        propiedad.precio = precio || propiedad.precio;
        propiedad.disponibilidad = disponibilidad || propiedad.disponibilidad;
        propiedad.imagen_url = imagen_url || propiedad.imagen_url;
  
        await propiedad.save(); // Guarda los cambios
  
        res.status(200).json(propiedad);
      } else {
        res.status(404).json({ message: "Propiedad no encontrada" });
      }
    } catch (error) {
      console.error("Error al actualizar propiedad:", error);
      res.status(500).json({ message: "Hubo un error al actualizar la propiedad" });
    }
};

export const eliminarProperty = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const propiedad = await Property.findByPk(id); // Buscar propiedad por ID
  
      if (propiedad) {
        await propiedad.destroy(); // Elimina la propiedad
        res.status(200).json({ message: "Propiedad eliminada exitosamente" });
      } else {
        res.status(404).json({ message: "Propiedad no encontrada" });
      }
    } catch (error) {
      console.error("Error al eliminar propiedad:", error);
      res.status(500).json({ message: "Hubo un error al eliminar la propiedad" });
    }
};

export const buscarPropertiesPorCiudad = async (req: Request, res: Response) => {
    try {
      const ciudad = req.query.ciudad as string; // Obtener la ciudad de la consulta
  
      if (!ciudad) {
        return res.status(400).json({ message: "La ciudad es obligatoria" });
      }
  
      // Buscar inmuebles donde la columna 'ubicacion' contiene la ciudad
      const propiedades = await Property.findAll({
        where: {
          ubicacion: {
            [Op.iLike]: `%${ciudad}%` // Utilizando operador ILIKE para búsqueda sin distinción de mayúsculas/minúsculas
          }
        }
      });
  
      if (propiedades.length > 0) {
        res.status(200).json(propiedades);
      } else {
        res.status(404).json({ message: "No se encontraron propiedades en esta ciudad" });
      }
    } catch (error) {
      console.error("Error al buscar propiedades por ciudad:", error);
      res.status(500).json({ message: "Hubo un error al buscar propiedades por ciudad" });
    }
};