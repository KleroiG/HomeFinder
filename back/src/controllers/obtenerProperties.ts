import { Request, Response } from "express";
import { Property } from "./Property";
import { Op } from "sequelize";



export const crearProperty = async (req: Request, res: Response) => {
    try {
      const { titulo, descripcion, ubicacion, precio, imagen_url,direccion, propietario_id } = req.body;
      
      const nuevoInmueble = await Property.create({
        titulo,
        descripcion,
        ubicacion,
        precio,
        imagen_url,
        direccion,
        creado_en: new Date(), 
        propietario_id,
        disponibilidad: true,
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



export const buscarPropertiesPorPropietarioId = async (req: Request, res: Response) => {
  try {
    const propietarioId = req.params.propietarioId; // ID del propietario pasado como parámetro en la URL

    if (!propietarioId) {
      return res.status(400).json({ message: "El ID del propietario es obligatorio" });
    }

    // Buscar todas las propiedades asociadas al propietario
    const propiedades = await Property.findAll({
      where: {
        propietario_id: propietarioId,
      },
    });

    if (propiedades.length > 0) {
      res.status(200).json(propiedades);
    } else {
      res.status(404).json({ message: "No se encontraron propiedades para este propietario" });
    }
  } catch (error) {
    console.error("Error al buscar propiedades por propietario ID:", error);
    res.status(500).json({ message: "Hubo un error al buscar propiedades por propietario ID" });
  }
};











export const actualizarDisponibilidad = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Buscar la propiedad por ID
    const propiedad = await Property.findByPk(id);

    if (!propiedad) {
      return res.status(404).json({ message: "Propiedad no encontrada" });
    }

    // Mostrar disponibilidad actual
    console.log("Disponibilidad actual de la propiedad:", propiedad.dataValues.disponibilidad);

    // Cambiar disponibilidad (invertir el valor)
    const nuevaDisponibilidad = !propiedad.dataValues.disponibilidad;

    // Actualizar solo el campo de disponibilidad
    await propiedad.update({ disponibilidad: nuevaDisponibilidad });

    console.log("Nueva disponibilidad de la propiedad:", nuevaDisponibilidad);

    // Retornar una respuesta exitosa
    return res.status(200).json({
      message: "Se cambió la disponibilidad correctamente",
      disponibilidad: nuevaDisponibilidad
    });
  } catch (error) {
    console.error("Error al actualizar disponibilidad:", error);
    return res.status(500).json({ message: "Hubo un error al actualizar la disponibilidad" });
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

