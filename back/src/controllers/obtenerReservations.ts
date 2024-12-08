import { Request, Response } from "express";
import { Reservation } from "./reservations";
import { Property } from "../controllers/Property";

// Obtener todas las reservas
export const obtenerReservas = async (req: Request, res: Response) => {
  try {
    const reservas = await Reservation.findAll();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener reservas" });
  }
};

// Crear una nueva reserva
export const crearReserva = async (req: Request, res: Response) => {
  try {
    const { usuario_id, inmueble_id, fecha_inicio, fecha_fin, estado } = req.body;

    const nuevaReserva = await Reservation.create({
      usuario_id,
      inmueble_id,
      fecha_inicio,
      fecha_fin,
      estado,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la reserva" });
  }
};

export const obtenerInmueblesConReservas = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Obtener el userId de los parámetros de la URL

    // Buscar las reservas activas del usuario
    const reservas = await Reservation.findAll({
      where: { usuario_id: userId, estado: true }, // Solo reservas activas
    });

    if (reservas.length === 0) {
      return res.status(200).json({ message: "No tienes reservas activas actualmente." });
    }

    // Obtener los IDs de los inmuebles asociados a las reservas
    const inmuebleIds = reservas.map((reserva) => reserva.dataValues.inmueble_id); // Acceder correctamente al inmueble_id

    console.log("IDs de inmuebles:", inmuebleIds); // Mostrar los IDs de los inmuebles

    // Verificar si inmuebleIds está vacío
    if (inmuebleIds.length === 0) {
      return res.status(200).json({ message: "No hay inmuebles asociados a tus reservas." });
    }

    // Buscar los inmuebles que corresponden a esos IDs
    const inmuebles = await Property.findAll({
      where: {
        id: inmuebleIds,
      },
    });

    // Si no se encuentran inmuebles
    if (inmuebles.length === 0) {
      return res.status(200).json({ message: "No se encontraron inmuebles para las reservas activas." });
    }

    res.json(inmuebles); // Devolver los inmuebles con reservas activas
  } catch (error) {
    console.error(error); // Mostrar el error en la consola
    res.status(500).json({ error: "Error al obtener los inmuebles con reservas" });
  }
};



// Actualizar el estado de una reserva
export const actualizarEstadoReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const reserva = await Reservation.findByPk(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    reserva.estado = estado;
    await reserva.save();

    res.json(reserva);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el estado de la reserva" });
  }
};

// Eliminar una reserva
export const eliminarReserva = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reserva = await Reservation.findByPk(id);

    if (!reserva) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    await reserva.destroy();

    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la reserva" });
  }
};
