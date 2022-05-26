import { 
   AllowNull, AutoIncrement,
   Column, CreatedAt, DataType,
   Default, Model, PrimaryKey, Table 
} from 'sequelize-typescript';

import { Phones } from './phone';


@Table({
   tableName: 'phone_messages', updatedAt: false
})
export class PhoneMessages extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number
   
   @Column
   from: number

   @Column
   to: number

   @Column
   message: string

   @Default(false)
   @Column(DataType.BOOLEAN)
   seen: boolean

   @CreatedAt
   sent: Date

   static send (player: PlayerMp, recipientNumber: number, message: string) {
      return Phones.findOne({ where: { number: recipientNumber } }).then(async targetPhone => {
         if (!targetPhone) {
            return false;
         }

         return await this.create({
            from: player.character.getPhone?.number,
            to: recipientNumber,
            message: message
         })
      })
   }
}


mp.events.add('CLIENT::PHONE_MESSAGE', PhoneMessages.send);