import { Model, Column, DataType, Table } from "sequelize-typescript";

@Table({ tableName: "reservations", timestamps: false })
export class Reservation extends Model {
  @Column({ type: DataType.BIGINT, allowNull: false })
  usuario_id!: number;

  @Column({ type: DataType.BIGINT, allowNull: false })
  inmueble_id!: number;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  fecha_inicio!: Date;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  fecha_fin!: Date;

  @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
  creado_en!: Date;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  estado!: boolean;
}