import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Property } from "../controllers/Property"
import { User } from "../controllers/Users"

dotenv.config()


const db = new Sequelize("postgresql://homefinder_sqhb_user:R8C5UrQC4t0lJPf1PUPUfTWEjlo7MWIx@dpg-csmf1lhu0jms73e58svg-a.oregon-postgres.render.com/homefinder_sqhb", {
  models: [User, Property],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
})

export default db
