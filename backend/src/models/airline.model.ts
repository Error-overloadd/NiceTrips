import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: "airline",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
})
export class Airline extends Model<Airline> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Airline_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Airline_Name!: string;


  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  Airline_Country!: string;

}
