// src/models/user.ts
import { Model, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "users", timestamps: false })
export class User extends Model {
  // Definimos las columnas de la tabla 'users'
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  nombre!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  correo_electronico!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  contrasena!: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  administrador!: boolean;

  @Column({ type: DataType.DATE, allowNull: false })
  creado_en!: Date;
}
