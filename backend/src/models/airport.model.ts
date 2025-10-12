import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: "airport",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
})
export class Airport extends Model<Airport> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Airport_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Airport_Name!: string;


  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  Airport_Country!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  Airport_City!: string;


}
