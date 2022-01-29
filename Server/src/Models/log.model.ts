import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { accounts, characters } from '@models';
import { timeDate } from '@shared';


const consoleColors = {
   red: '\x1b[31m',
   white: '\x1b[37m',
   green: '\x1b[32m',
   yellow: '\x1b[33m'
}

@Table
export class logs extends Model {

   @Column
   @PrimaryKey
   @AutoIncrement
   id: number

   @Column
   @Default('')
   type: string

   @Column
   account_id: number

   @Column
   character_id: number

   @Column
   participant: number

   @Column
   @Default('')
   message: number

   @Column
   @CreatedAt
   created_At: Date;

   @Column
   @UpdatedAt
   updated_At: Date;

   static new (account: accounts, character: characters, participant: accounts, message: string) {
      logs.create({ account_id: account.id, character_id: character.id, participant: participant.id, content: message });
   }

   static error (message: any) {
      console.log(consoleColors.red + '[' + timeDate() + ']' + consoleColors.white + message);
   } 

   static info (message: string) {
      console.log(consoleColors.yellow + '[' + timeDate() + ']' + consoleColors.white + message);
   }

   static succes (message: string) {
      console.log(consoleColors.green + '[' + timeDate() + ']' + consoleColors.white + message);
   }
}

