import { Table, Column, Model, DataType, ForeignKey,BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "payment",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
    createdAt: "Created_Datetime",
    updatedAt: "Updated_Datetime",
})
export class Payment extends Model<Payment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Payment_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Cardholder_Name!: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
  })
  Payment_Currency!: string;
 // Total number of  digits,
 // Number of digits after the decimal point
  @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        // precision: 10,  // Total number of digits
        // scale: 2,       // Number of digits after the decimal point
   })
  Payment_Amount!: string;

  @Column({
        type: DataType.STRING(10),
        allowNull: false,
    })
  Payment_Channel!: string;


  // Foreign key to reference the User model
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  User_ID!: number;  // Foreign key to the user that owns the role


  // Relationship with user model (a role belongs to one user)
  @BelongsTo(() => User)
  user?: User;
}
