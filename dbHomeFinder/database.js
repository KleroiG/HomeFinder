import pg from "pg";

export const pool = new pg.Pool({
    host:"dpg-csmf1lhu0jms73e58svg-a.oregon-postgres.render.com",
    port:5432,
    database: "homefinder_sqhb",
    user: "homefinder_sqhb_user",
    password: "R8C5UrQC4t0lJPf1PUPUfTWEjlo7MWIx",
    ssl: {
        rejectUnauthorized: false, // Necesario para conexiones seguras en Render
    },
});