import InmuebleModels from "../models/InmuebleModels.js";



//Mostrar todos los registro
export const getAllInmuebles = async (req, res) => {
  try {
    const inmuebles = await InmuebleModels.findAll(); // Obtiene todos los inmuebles
    res.json(inmuebles); // Devuelve los inmuebles como respuesta
  } catch (error) {
    console.error('Error al obtener inmuebles:', error);
    res.status(500).json({ message: 'Error al obtener inmuebles' }); // Manejo de errores
  }
};


//Mostrar un solo registro
export const getInmueble = async (req,res) => {
    try {
        const inmueble = InmuebleModels.findAll({
            where:{
                id:req.params.id
            }
        })
        res.json(inmueble)
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear un registro
export const createInmueble = async (req,res) => {
    try {
        await InmuebleModels.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

//Actualizar un registro
export const UpdateInmueble = async (req,res) =>{
    try {
        await InmuebleModels.update(req.body, {
            where: {id:req.params.id}
        })
        res.json({
            "message":"Registro actualizado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar un registro 
export const EliminarInmueble = async (req,res)=>{
    try {
        await InmuebleModels.destroy({
            where: {id: req.params.id}
        })
        res.json({
            "message":"Registro eliminado correctamente"
        })
    } catch (error) {
        res.json({message: error.message})
    }
}
