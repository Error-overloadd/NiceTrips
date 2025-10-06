import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: true, 
  createdAt: "Created_Datetime", 
  updatedAt: "Updated_Datetime",
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  
  })
  User_ID!: number;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,
  
  })
  Username!: string;

  @Column({
    type: DataType.STRING(25),
    allowNull: false,

  })
  Email_Address!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  
  })
  Postal_Address?: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: true,
  })
  Mobile_Number?: string;


}