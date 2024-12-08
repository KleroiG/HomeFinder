import { Router } from "express";
import {
  obtenerReservas,
  crearReserva,
  actualizarEstadoReserva,
  eliminarReserva,
  obtenerInmueblesConReservas,
} from "../controllers/obtenerReservations";

const router = Router();

// Obtener todas las reservas
router.get("/", obtenerReservas);

// Obtener inmuebles con reservas para un usuario
router.get("/user/:userId", obtenerInmueblesConReservas);

// Crear una nueva reserva
router.post("/", crearReserva);

// Actualizar el estado de una reserva
router.put("/estado/:id", actualizarEstadoReserva);

// Eliminar una reserva
router.delete("/:id", eliminarReserva);

export default router;
