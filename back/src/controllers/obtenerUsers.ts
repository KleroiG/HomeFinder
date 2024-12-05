import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from './Users'; // Importamos el modelo User
import { Op } from 'sequelize';

const saltRounds = 10;
export const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    const nombre=username;
    const correo_electronico=email

    // Comprobar si el nombre de usuario o correo electrónico ya existen
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [{ nombre }, { correo_electronico }],
        },
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "El nombre de usuario o el correo electrónico ya están en uso" });
      }
  
      // Encriptar la contraseña
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Crear el nuevo usuario en la base de datos
      const newUser = await User.create({
        nombre,
        correo_electronico,
        contrasena: hashedPassword, // Guardar la contraseña encriptada
        administrador: false, // Si es necesario, ajustar este valor
        creado_en: new Date(), // Si usas un campo `creado_en`, puedes asignar la fecha actual
      });
  
      return res.status(201).json({ message: "Usuario creado exitosamente", user: newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Hubo un error al crear el usuario" });
    }
  };

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el usuario' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, correo_electronico, contrasena, administrador } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    user.nombre = nombre || user.nombre;
    user.correo_electronico = correo_electronico || user.correo_electronico;
    user.contrasena = contrasena || user.contrasena;
    user.administrador = administrador !== undefined ? administrador : user.administrador;

    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};
