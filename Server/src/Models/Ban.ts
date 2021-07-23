import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Globals } from '../Globals/Globals';
import { Messages } from '../Globals/Messages';
import { Main } from '../Server/Main';
import Accounts from './Account';
import Characters from './Character';

@Table
class Ban extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number;

   @Column
   Account: number;

   @Column
   Character: number;

   @Column
   @Default('')
   IP: string

   @Column
   @Default(0)
   HardwareId: string;

   @Column
   @Default('')
   Social: string;

   @Column
   @Default(0)
   Issuer: number;

   @Column
   @Default('')
   Reason: string;

   @Column
   @Default(Date.now())
   Date: string;

   @Column
   @Default(0)
   Expiring: string;

   @Column
   @UpdatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;


   // Target can be IP/Exact_Character_Name
   static async New(player: PlayerMp, target: any, reason: string, date: Date, expiring: Date) {
      const IP = Main.ValidateIP(target);
      if (IP) {
         const UserAcc = await Accounts.findOne({ where: { id: player.CHARACTER_ID } })
         const Banned = await Ban.create({ IP: target.ip, Reason: reason, Date: date, Expiring: expiring, Issuer: player.ACCOUNT_ID });
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
            const Account = Online.Account();

            Ban.create({ Account: Online.ACCOUNT_ID, Character: Online.CHARACTER_ID, IP: Account.IP_Adress, Hardwer: Account.Hardwer, Social: Account.Social_Club, Date: date, Expiring: expiring, Issuer: player.ACCOUNT_ID });
            Online.kick(reason);
         } else {
            const OfflineAcc = await Accounts.findOne({ where: { Name: target } })
            if (OfflineAcc) {
               Ban.create({ Account: OfflineAcc.id, Character: OfflineAcc.id, IP: OfflineAcc.IP_Adress, Hardwer: OfflineAcc.Hardwer, Social: OfflineAcc.Social_Club, Date: date, Expiring: expiring, Issuer: player.ACCOUNT_ID });
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
      const Result = await Ban.findOne({ where: { IP: player.ip, Social: player.socialClub } });
      return Result ? Result : false;
   };
}


(async () => {

   Ban.sync();

})();