import { Router } from "express"
import { actualizarDisponibilidad, actualizarProperty, buscarPropertiesPorPropietarioId, crearProperty, eliminarProperty, obtenerProperties, obtenerPropertyPorId } from "../controllers/obtenerProperties";
const router = Router()

//                Rutas Inmuebles

// Routing
router.get("/", obtenerProperties);

router.get("/:id", obtenerPropertyPorId);

router.get("/propietario/:propietarioId", buscarPropertiesPorPropietarioId);

// Crear un nuevo inmueble
router.post("/", crearProperty);

// Actualizar un inmueble por ID
router.put("/:id", actualizarProperty);

router.patch("/disponibilidad/:id", actualizarDisponibilidad);

// Eliminar un inmueble por ID
router.delete("/:id", eliminarProperty);





export default router
