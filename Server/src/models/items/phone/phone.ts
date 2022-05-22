import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';

import { Items } from '../item';
import { PhoneContacts } from './contact';


@Table({
   tableName: 'phones', createdAt: false, updatedAt: false
})
export class Phones extends Model {
   @Column({
      primaryKey: true, unique: true, field: 'phone_number'
   })
   number: number

   @ForeignKey(() => Items)
   @Column({
      type: DataType.INTEGER({ length: 11 }), field: 'item_id'
   })
   itemId: number
   
   @Default(null)
   @Column({
      type: DataType.STRING, field: 'person_name'
   })
   personName: string | null

   @BelongsTo(() => Items)
   item: Items
   
   @Default(false)
   @Column(DataType.BOOLEAN)
   power: boolean

   @Default(1.0)
   @Column(DataType.FLOAT)
   brightness: number

   @HasMany(() => PhoneContacts)
   contacts: PhoneContacts[]

   call (player: PlayerMp, number: number) {
      const target = mp.players.toArray().find(
         (target) => {
            target.character.getPhone && target.character.getPhone.number == number
         }
      );

      if (target) {

      } else {

      }
   }
}