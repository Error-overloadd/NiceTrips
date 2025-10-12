import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "roles",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
  createdAt: "Created_Datetime",
  updatedAt: "Updated_Datetime",
})
export class Role extends Model<Role> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Role_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Role_Name!: string;


  // Foreign key to reference the User model
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  User_ID!: number;  // Foreign key to the user that owns the role


  // Relationship with user model (a role belongs to one user)
  user!: User;
}
