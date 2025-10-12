import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Booking } from "./booking.model";
import { Seat } from "./seat.model";

@Table({
  tableName: "passenger",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt

})
export class Passenger extends Model<Passenger> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Passenger_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Passenger_First_Name!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Passenger_Last_Name!: string;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Email!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Date_Of_Birth!: string;


  @ForeignKey(() => Booking)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Booking_ID!: number;


  @ForeignKey(() => Seat)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Seat_ID!: number;


  // Relationship with booking model
  @BelongsTo(() => Booking)
  booking: Booking;

  // Relationship with seat model
  @BelongsTo(() => Seat)
  seat: Seat;


}
