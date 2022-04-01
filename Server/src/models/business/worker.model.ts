import { Table, Model, PrimaryKey, AutoIncrement, Column, Default, BelongsTo, DataType, CreatedAt, UpdatedAt, ForeignKey } from 'sequelize-typescript';
import { Busines } from '@models';


@Table({
   tableName: 'workers'
})
export class Workers extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Column(DataType.TEXT)
   name: string

   @ForeignKey(() => Busines)
   @Column(DataType.INTEGER)
   business_id: number

   @BelongsTo(() => Busines)
   business: Busines

   @Column(DataType.INTEGER)
   salary: number

   @Column(DataType.TEXT)
   hired_By: string

   @CreatedAt
   created_At: Date

   @UpdatedAt
   updated_At: Date
}
