import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "./user.model";
import { Flight } from "./flight.model";
import { Passenger } from "./passenger.model";

@Table({
  tableName: "booking",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
    createdAt: "Created_Datetime",
    updatedAt: "Updated_Datetime",
})
export class Booking extends Model<Booking> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Booking_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Booking_Type!: string;



  // Foreign key to reference the User model
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  User_ID!: number;

  // Foreign key to reference the Flight model
  @ForeignKey(() => Flight)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Flight_ID!: number;


  // Foreign key to reference the Passenger model
  @ForeignKey(() => Passenger)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Passenger_ID!: number;


  // Relationship with user model (a role belongs to one user)
  @BelongsTo(() => User)
  user!: User;

  // Relationship with flight model
  @BelongsTo(() => Flight)
  flight!: Flight;

  // Relationship with passenger model
  @BelongsTo(() => Passenger)
  passenger!: Passenger;
}
