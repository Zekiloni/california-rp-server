import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { business, items } from '@models';
import { none } from '@constants';


@Table
export class products extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column(DataType.TEXT)
   name: keyof typeof items.list

   @ForeignKey(() => business)
   @Column
   businesID: number
 
   @BelongsTo(() => business)
   busines: business
   
   @Column(DataType.INTEGER)
   price: number

   @Default(none)
   @Column(DataType.INTEGER)
   quantity: number

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}