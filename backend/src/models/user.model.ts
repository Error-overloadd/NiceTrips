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
@Table({
  tableName: "users",
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

   @Column({ field: "Password_Hash", type: DataType.STRING(200), allowNull: false })
  passwordHash!: string;


  @Column({
    type: DataType.VIRTUAL,
    set(this: User, value: string) {
      if (!value || value.length < 8 || value.length > 64) {
        throw new Error("密码长度需在 8~64 之间");
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