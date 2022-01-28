import { NotifyType } from '../../globals/enums';
import { Messages } from '../../globals/constants';
import { validateIP } from '../../utils';
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';


@Table
export class bans extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number;

   @Column
   account_id: number;

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

   @Default(0)
   @Column
   expirinrg: string;

   @CreatedAt
   created_At: Date;

   @UpdatedAt
   updated_At: Date;

   static async createBan (player: PlayerMp, target: any, reason: string, date: Date, expiring: Date) {
      const ipAdress = validateIP(target);
      if (ipAdress) {
         const playerAccount = player.Account;
         const Banned = await Bans.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.Account.id });
         if (playerAccount) {
            Banned.Account = playerAccount.id;
            Banned.HardwareId = playerAccount.hardwer;
            Banned.Social = playerAccount.social_club;
         }
         await Banned.save();
      }
      else {
         let Online = mp.players.find(target);
         if (Online) {
            const Account = await Online.Account;

            Bans.create({ Account: Online.Account.id, Character: Online.Character.id, IP: Account.ip_adress, Hardwer: Account.hardwer, Social: Account.social_club, Date: date, Expiring: expiring, Issuer: player.Account.id });
            Online.kick(reason);
         } else {
            const OfflineAcc = await Accounts.findOne({ where: { Name: target } })
            if (OfflineAcc) {
               Bans.create({ Account: OfflineAcc.id, Character: OfflineAcc.id, IP: OfflineAcc.ip_adress, Hardwer: OfflineAcc.hardwer, Social: OfflineAcc.social_club, Date: date, Expiring: expiring, Issuer: player.Account.id });
            } else {
               player.sendNotification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
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
      const result = await Bans.findOne({ where: { IP: player.ip, Social: player.socialClub } });
      return result ? result : false;
   };
}

