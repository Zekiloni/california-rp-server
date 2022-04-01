
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';

import { Lang } from '@constants';
import { validateIP } from '@shared';
import { notifications } from '@enums';
import { Accounts } from './players/account';

@Table({
   tableName: 'bans'
})
export class Bans extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   account: number

   @Default(null)
   @Column
   ip: string

   @Default(0)
   @Column
   hardware: string;

   @Default(null)
   @Column
   social: string;

   @Default(0)
   @Column
   issuer: number;

   @Default('')
   @Column
   reason: string;

   @Default(Date.now())
   @Column
   date: string;

   @Default(-1)
   @Column
   expirinrg: number;

   @CreatedAt
   created_At: Date;

   @UpdatedAt
   updated_At: Date;

   static async add (player: PlayerMp, target: any, reason: string, date: Date, expiring: Date) {
      const ipAdress = validateIP(target);
      if (ipAdress) {
         const playerAccount = player.account;
         const Banned = await Bans.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.account.id });
         if (playerAccount) {
            Banned.account = playerAccount.id;
            Banned.hardware = playerAccount.hardwer;
            Banned.social = playerAccount.social_club;
         }
         await Banned.save();
      }
      else {
         let Online = mp.players.find(target);
         if (Online) {
            const Account = await Online.account;

            Bans.create({ Account: Online.account.id, Character: Online.character.id, IP: Account.ip, Hardwer: Account.hardwer, Social: Account.social_club, Date: date, Expiring: expiring, Issuer: player.account.id });
            Online.kick(reason);
         } else {
            const OfflineAcc = await Accounts.findOne({ where: { Name: target } })
            if (OfflineAcc) {
               Bans.create({ Account: OfflineAcc.id, Character: OfflineAcc.id, IP: OfflineAcc.ip, Hardwer: OfflineAcc.hardwer, Social: OfflineAcc.social_club, Date: date, Expiring: expiring, Issuer: player.account.id });
            } else {
               player.notification(Lang.userNotFound, notifications.type.ERROR, 5);
            }
         }
      }
   };

   static async delete (player: PlayerMp) {
      const Result = await this.isBanned(player);
      if (Result) {
         Result.destroy();
         // Log
      }
   }

   static async isBanned (player: PlayerMp) {
      const result = await Bans.findOne( { where: { ip: player.ip, social: player.socialClub } } );
      return result ? result : false;
   };
}

