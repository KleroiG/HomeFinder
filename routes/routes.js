import express from 'express'
import { createInmueble, EliminarInmueble, getAllInmuebles, getInmueble, UpdateInmueble } from '../controllers/controllerInmueble.js'


const router = express.Router()

router.get('/', getAllInmuebles)
router.get('/:id',getInmueble)
router.post('/',createInmueble)
router.put('/:id',UpdateInmueble)
router.delete('/:id',EliminarInmueble)

export default router