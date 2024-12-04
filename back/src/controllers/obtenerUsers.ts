// src/controllers/userController.ts

import { Request, Response } from 'express';
import { User } from './Users'; // Importamos el modelo User

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, correo_electronico, contrasena, administrador = false } = req.body;

    // Validaciones básicas
    if (!nombre || !correo_electronico || !contrasena) {
      return res.status(400).json({ message: 'Nombre, correo electrónico y contraseña son obligatorios.' });
    }

    const newUser = await User.create({
      nombre,
      correo_electronico,
      contrasena,
      administrador
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
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
