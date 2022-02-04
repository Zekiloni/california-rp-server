import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';


@Table
export class worker extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column(DataType.INTEGER)
   character: number

   @Column(DataType.INTEGER)
   price: number

   @Column(DataType.INTEGER)
   hired_By: number

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}