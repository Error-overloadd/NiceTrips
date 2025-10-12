import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";

@Table({
  tableName: "aircraft",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
})
export class Aircraft extends Model<Aircraft> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Aircraft_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Aircraft_Model!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Aircraft_Capacity!: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  Aircraft_Speed!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  })
  Aircraft_Efficiency!: string;


}
