import pg, { PoolConfig } from "pg"

// Definir el tipo de configuración para el Pool
const poolConfig: PoolConfig = {
  host: "dpg-csmf1lhu0jms73e58svg-a.oregon-postgres.render.com",
  port: 5432,
  database: "homefinder_sqhb",
  user: "homefinder_sqhb_user",
  password: "R8C5UrQC4t0lJPf1PUPUfTWEjlo7MWIx",
  ssl: {
    rejectUnauthorized: false, // Necesario para conexiones seguras en Render
  },
}

// Crear el pool de conexiones con la configuración
export const pool = new pg.Pool(poolConfig)
