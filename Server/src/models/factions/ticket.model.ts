import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, AllowNull, DataType } from 'sequelize-typescript';


@Table
export class tickets extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @AllowNull(true)
   @Column(DataType.STRING)
   character_name: string

   @AllowNull(true)
   @Column(DataType.STRING)
   numberplate: string

   @AllowNull(false)
   @Column
   type: number

   @Default(false)
   @Column(DataType.BOOLEAN)
   paid: boolean

   @AllowNull(false)
   @Column
   @Default('Unknown')
   Address: string;

   @Default('')
   @Column
   note: string

   @AllowNull(false)
   @Column(DataType.NUMBER)
   issuer: number

   @Column(DataType.BIGINT)
   date: number
}
