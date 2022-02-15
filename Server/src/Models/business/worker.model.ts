import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { business } from '@models';


@Table
export class workers extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column(DataType.TEXT)
   name: string

   @ForeignKey(() => business)
   @Column(DataType.INTEGER)
   business_id: number

   @BelongsTo(() => business)
   business: business

   @Column(DataType.INTEGER)
   salary: number

   @Column(DataType.TEXT)
   hired_By: string

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}
