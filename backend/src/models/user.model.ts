import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeSave,
  AllowNull,
} from "sequelize-typescript";
import bcrypt from "bcrypt-ts";

// define the 　table name
@Table({
  tableName: "users",
  timestamps: true, 
  createdAt: "Created_Datetime", 
  updatedAt: "Updated_Datetime",
})
// create the user table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  
  })
  User_ID!: number;
// several column in the table
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

   @Column({ field: "Password_Hash", type: DataType.STRING(200), allowNull: false })
  passwordHash!: string;


  @Column({
    type: DataType.VIRTUAL,
    set(this: User, value: string) {
      if (!value || value.length < 8 || value.length > 64) {
        throw new Error("Password length must be between 8 and 64 characters.");
      }
      const hash = bcrypt.hashSync(value, 12);
      this.setDataValue("passwordHash", hash);  
      this.setDataValue("password", undefined);     
    },
  })
  password?: string;

  async verifyPassword(plain: string) {
    return bcrypt.compare(plain, this.passwordHash);
  }
  @Column({
  type: DataType.STRING(10),
  allowNull: false,
  field: "Role",
  defaultValue: "user",
})
Role!: "user" | "admin";

}