import { AutoIncrement, BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { Phones } from './phone';


@Table({
   tableName: 'phone_contacts', updatedAt: false
})
export class PhoneContacts extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @ForeignKey(() => Phones)
   @Column({ 
      field: 'phone_number'
   })
   phoneNumber: number

   @BelongsTo(() => Phones)
   phone: Phones

   @Column({
      type: DataType.STRING, field: 'contact_name'
   })
   name: string
   
   @Column({
      type: DataType.INTEGER, field: 'contact_number'
   })
   number: number

   @CreatedAt
   @Column({ field: 'created_at' })
   createdAt: Date
}