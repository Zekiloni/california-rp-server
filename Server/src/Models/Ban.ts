import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Globals } from '../Global/Globals';
import { Messages } from '../Global/Messages';
import { Main } from '../Server/Main';
import Accounts from './Account.model';
import Characters from './Character';

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
   static async New(player: PlayerMp, target: any, reason: string, date: Date, expiring: Date) {
      const IP = Main.ValidateIP(target);
      if (IP) {
         const UserAcc = player.Account;
         const Banned = await Bans.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.Account.id });
         if (UserAcc) {
            Banned.Account = UserAcc.id;
            Banned.HardwareId = UserAcc.Hardwer;
            Banned.Social = UserAcc.Social_Club;
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
               // That user is not found
               player.Notification(Messages.USER_NOT_FOUND, Globals.Notification.Error, 5);
            }
         }
      }
   };

   static async Delete(player: PlayerMp) {
      const Result = await this.Check(player);
      if (Result) {
         Result.destroy();
         // Log
      }
   }

   static async Check(player: PlayerMp) {
      const Result = await Bans.findOne({ where: { IP: player.ip, Social: player.socialClub } });
      return Result ? Result : false;
   };
}


(async () => {

   Bans.sync();

})();