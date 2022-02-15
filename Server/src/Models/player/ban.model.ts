
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';

import { lang } from '@constants';
import { validateIP } from '@shared';
import { accounts } from '@models';
import { notifications } from '@enums';


@Table
export class bans extends Model {
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
   hardware_Id: string;

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
         const Banned = await bans.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.account.id });
         if (playerAccount) {
            Banned.account = playerAccount.id;
            Banned.hardware_Id = playerAccount.hardwer;
            Banned.social = playerAccount.social_club;
         }
         await Banned.save();
      }
      else {
         let Online = mp.players.find(target);
         if (Online) {
            const Account = await Online.account;

            bans.create({ Account: Online.account.id, Character: Online.character.id, IP: Account.ip_adress, Hardwer: Account.hardwer, Social: Account.social_club, Date: date, Expiring: expiring, Issuer: player.account.id });
            Online.kick(reason);
         } else {
            const OfflineAcc = await accounts.findOne({ where: { Name: target } })
            if (OfflineAcc) {
               bans.create({ Account: OfflineAcc.id, Character: OfflineAcc.id, IP: OfflineAcc.ip_adress, Hardwer: OfflineAcc.hardwer, Social: OfflineAcc.social_club, Date: date, Expiring: expiring, Issuer: player.account.id });
            } else {
               player.notification(lang.userNotFound, notifications.type.ERROR, 5);
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
      const result = await bans.findOne( { where: { ip: player.ip, social: player.socialClub } } );
      return result ? result : false;
   };
}

