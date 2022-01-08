import { NotifyType } from '../globals/enums';
import { Messages } from '../globals/constants';
import { validateIP } from '../utils';
import { Table, Column, Model, PrimaryKey, AutoIncrement, Default, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import Accounts from './account.model';


@Table
export default class Bans extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   ID: number;

   @Column
   Account: number;

   @Column
   Character: number;

   @Default('')
   @Column
   IP: string

   @Default(0)
   @Column
   HardwareId: string;

   @Default('')
   @Column
   Social: string;

   @Default(0)
   @Column
   Issuer: number;

   @Default('')
   @Column
   Reason: string;

   @Default(Date.now())
   @Column
   Date: string;

   @Default(0)
   @Column
   Expiring: string;

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;


   // Target can be IP/Exact_Character_Name
   static async createBan (player: PlayerMp, target: any, reason: string, date: Date, expiring: Date) {
      const ipAdress = validateIP(target);
      if (ipAdress) {
         const playerAccount = player.Account;
         const Banned = await Bans.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.Account.id });
         if (playerAccount) {
            Banned.Account = playerAccount.id;
            Banned.HardwareId = playerAccount.Hardwer;
            Banned.Social = playerAccount.Social_Club;
         }
         await Banned.save();
      }
      else {
         let Online = mp.players.find(target);
         if (Online) {
            const Account = await Online.Account;

            Bans.create({ Account: Online.Account.id, Character: Online.Character.id, IP: Account.IP_Adress, Hardwer: Account.Hardwer, Social: Account.Social_Club, Date: date, Expiring: expiring, Issuer: player.Account.id });
            Online.kick(reason);
         } else {
            const OfflineAcc = await Accounts.findOne({ where: { Name: target } })
            if (OfflineAcc) {
               Bans.create({ Account: OfflineAcc.id, Character: OfflineAcc.id, IP: OfflineAcc.IP_Adress, Hardwer: OfflineAcc.Hardwer, Social: OfflineAcc.Social_Club, Date: date, Expiring: expiring, Issuer: player.Account.id });
            } else {
               player.Notification(Messages.USER_NOT_FOUND, NotifyType.ERROR, 5);
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

