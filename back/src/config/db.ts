import { Sequelize } from "sequelize-typescript"
import dotenv from "dotenv"
import { Property } from "../controllers/Property"
import { User } from "../controllers/Users"
import { Reservation } from "../controllers/reservations"

dotenv.config()


const db = new Sequelize("postgresql://homefinder_rb7y_user:nRfNrgJqcX9pc1Ke6x8v1NsIWq6SHRCH@dpg-ct9n12jtq21c73ae6640-a.oregon-postgres.render.com/homefinder_rb7y", {
  models: [User, Property, Reservation],
  logging: console.log,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
})

export default db
