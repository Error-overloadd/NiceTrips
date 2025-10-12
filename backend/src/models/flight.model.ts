import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Booking } from "./booking.model";
import { Seat } from "./seat.model";
import { Airport } from "./airport.model";
import { Airline } from "./airline.model";
import { Aircraft } from "./aircraft.model";

@Table({
  tableName: "flight",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt

})
export class Flight extends Model<Flight> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Flight_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Flight_Name!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Flight_Start_Time!: string;


  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Flight_End_Time!: string;



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


  @ForeignKey(() => Airport)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Airport_ID!: number;

  @ForeignKey(() => Airline)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Airline_ID!: number;

  @ForeignKey(() => Aircraft)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Aircraft_ID!: number;


  // Relationship with booking model
  @HasMany(() => Booking, { foreignKey: "Flight_ID" })
  bookings!: Booking[];

  // Relationship with seat model
  @HasMany(() => Seat, { foreignKey: "Seat_ID" })
  seats!: Seat[];

  @BelongsTo(() => Airline)
  airline!: Airline;

  @BelongsTo(() => Aircraft)
  aircraft!: Aircraft;

  @BelongsTo(() => Airport)
  airport!: Airport;

}
