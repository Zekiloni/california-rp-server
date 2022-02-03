

import rp from 'request-promise';

import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { accounts, characters } from '@models';
import { timeDate } from '@shared';
import { logging } from '@enums';
import { serverConfig } from '@configs';
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

   static new (account: accounts, character: characters, participant: accounts, message: string) {
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

   static discord (title: string, message: string, category: logging.category) {
      
      const embed = {
         title: title,
         description: message,
         color: parseInt(colors.hex.BROADCAST, 16)
      };

      const params = {
         username: serverConfig.name,
         embeds: [embed]
      };

      const options = {
         method: 'POST',
         uri: serverConfig.discordLog,
         body: params,
         json: true
      };

      rp(options)
         .catch(e => logs.error('discordHook: ' + e) );
   }
}

