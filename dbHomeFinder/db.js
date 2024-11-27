import { pool } from "./database.js";

// Obtener todos los registros
export const getAll = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

// Obtener un registro por ID
export const getById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      console.log("Registro no encontrado");
    } else {
      console.log(result.rows[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

// Crear un nuevo registro
export const create = async (nombre, correo_electronico, contrasena) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (nombre, correo_electronico, contrasena) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo_electronico, contrasena]
    );
    console.log("Registro creado:", result.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

// Actualizar un registro por ID
export const update = async (id, nombre, correo_electronico, contrasena) => {
  try {
    const result = await pool.query(
      "UPDATE users SET nombre = $1, correo_electronico = $2, contrasena = $3 WHERE id = $4 RETURNING *",
      [nombre, correo_electronico, contrasena, id]
    );
    if (result.rows.length === 0) {
      console.log("Registro no encontrado");
    } else {
      console.log("Registro actualizado:", result.rows[0]);
    }
  } catch (error) {
    console.error(error);
  }
};

// Eliminar un registro por ID
export const remove = async (id) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      console.log("Registro no encontrado");
    } else {
      console.log("Registro eliminado:", result.rows[0]);
    }
  } catch (error) {
    console.error(error);
  }
};


