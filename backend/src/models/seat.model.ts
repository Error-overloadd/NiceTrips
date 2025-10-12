import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Passenger } from "./passenger.model";
import { Flight } from "./flight.model";
import { defaultValueSchemable } from "sequelize/types/utils";

@Table({
  tableName: "seat",  // Table name
  timestamps: true,  // Automatically include createdAt and updatedAt
})
export class Seat extends Model<Seat> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  Seat_ID!: number;  // Primary key, auto-incremented

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Seat_Name!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Seat_Category!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  Seat_Availability!: number;


  @ForeignKey(() => Passenger)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  Passenger_ID!: number;

    @ForeignKey(() => Flight)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    Flight_ID!: number;


  @BelongsTo(() => Passenger)
   passenger?: Passenger;

  @BelongsTo(() => Flight)
   flight?: Flight;


}
