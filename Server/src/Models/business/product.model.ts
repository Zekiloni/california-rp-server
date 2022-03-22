import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { Busines, Items } from '@models';
import { none } from '@constants';


@Table
export class Products extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column(DataType.TEXT)
   name: keyof typeof Items.list

   @ForeignKey(() => Busines)
   @Column
   businesID: number
 
   @BelongsTo(() => Busines)
   busines: Busines
   
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