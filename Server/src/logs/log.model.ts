

import rp from 'request-promise';

import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Accounts, Characters } from 'src/vehicles';
import { timeDate } from '@shared';
import { logging } from '@enums';
import { ServerConfig } from '@configs';
import { colors } from '@constants';



const consoleColors = {
   red: '\x1b[31m',
   white: '\x1b[37m',
   green: '\x1b[32m',
   yellow: '\x1b[33m'
};


@Table
export class logs extends Model {

   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default('')
   @Column
   type: string

   @Column
   account_id: number

   @Column
   character_id: number

   @Column
   participant: number

   @Default('')
   @Column
   message: string

   @CreatedAt
   @Column
   created_At: Date

   @UpdatedAt
   @Column
   updated_At: Date

   static new (account: Accounts, character: Characters, participant: Accounts, message: string) {
      logs.create({ account_id: account.id, character_id: character.id, participant: participant.id, content: message });
   }

   static error (message: any) {
      console.log(consoleColors.red + '[' + timeDate() + '] ' + consoleColors.white + message);
   } 

   static info (message: string) {
      console.log(consoleColors.yellow + '[' + timeDate() + '] ' + consoleColors.white + message);
   }

   static succes (message: string) {
      console.log(consoleColors.green + '[' + timeDate() + '] ' + consoleColors.white + message);
   }

}

