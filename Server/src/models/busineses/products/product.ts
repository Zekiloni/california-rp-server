import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { Busines, BaseItem } from '@models';
import { none } from '@constants';


@Table({
   tableName: 'products'
})
export class Products extends Model {
   @Column({
      type: DataType.INTEGER({ length: 11 }),
      primaryKey: true, 
      autoIncrement: true
   })
   id: number

   @Column(DataType.TEXT)
   name: keyof typeof BaseItem.list

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

   @Default(0)
   @Column(DataType.INTEGER)
   discount: number

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}