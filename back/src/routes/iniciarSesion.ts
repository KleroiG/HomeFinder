import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../controllers/Users"; // Asegúrate de que la ruta sea correcta

const router = Router();

router.post("/", async (req, res) => {

  // Cambiar 'username' y 'password' por 'nombre' y 'contrasena'
  const { nombre, contrasena } = req.body;

  if (!nombre || !contrasena) {
    return res.status(400).json({ message: "Por favor ingresa un nombre de usuario y contraseña." });
  }

  try {
    // Buscar el usuario usando 'nombre' en lugar de 'username'
    const user = await User.findOne({ where: { nombre } });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar la contraseña con 'contrasena'
  
    const isMatch = await bcrypt.compare(contrasena, user.get('contrasena'));
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Crear el token
    const token = jwt.sign({ id: user.id, nombre: user.nombre }, "secreto", { expiresIn: "1h" });
      res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        id: user.id
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});


export default router;
