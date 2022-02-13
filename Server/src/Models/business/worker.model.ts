import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { business } from '@models';


@Table
export class workers extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column(DataType.INTEGER)
   character: number

   @ForeignKey(() => business)
   @Column(DataType.INTEGER)
   business_id: number

   @BelongsTo(() => business)
   business: business

   @Column(DataType.INTEGER)
   salary: number

   @Column(DataType.INTEGER)
   hired_By: number

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}
