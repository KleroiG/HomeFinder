import { Model, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "properties", timestamps: false })
export class Property extends Model {
  @Column({ type: DataType.INTEGER, allowNull: false })
  propietario_id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  titulo!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  descripcion!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  ubicacion!: string;

  @Column({ type: DataType.DATE, allowNull: false })
  creado_en!: Date;

  @Column({ type: DataType.DECIMAL, allowNull: false })
  precio!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  disponibilidad!: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  imagen_url!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  direccion!: string;
}
