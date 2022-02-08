import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { business } from '@models';


@Table
export class products extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column
   product: string

   @ForeignKey(() => business)
   @Column(DataType.INTEGER)
   business_id: number

   @BelongsTo(() => business)
   business: business
   
   @Column(DataType.INTEGER)
   price: number

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}