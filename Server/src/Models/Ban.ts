import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Messages } from '../Globals/Messages';
import { Main } from '../Server/Main';
import { Account } from './Account';

@Table
class Ban extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number

   @Column
   Account: number

   @Column
   Character: number

   @Column
   @Default('')
   IP: string

   @Column
   @Default(0)
   HardwareId: string

   @Column
   @Default('')
   Social: string

   @Column
   @Default(0)
   Issuer: number

   @Column
   @Default('')
   Reason: string

   @Column
   @Default(Date.now())
   Date: string

   @Column
   @Default(0)
   Expiring: string

   @Column
   @UpdatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   BanPlayer = async function (player: PlayerMp, target: PlayerMp, reason: string, date: Date, expiring: Date, isIp: boolean = false) {

      if (isIp) {
         let IP = Main.ValidateIP(target.ip);
         if (IP) {
            const UserAcc = await Account.findOne({ where: { id: player.character } })
            const Banned = await Ban.create({ IP: IP, Reason: reason, Date: date, Expiring: expiring, Issuer: player.account });
            if (UserAcc) {
               Banned.Account = UserAcc.id;
               Banned.HardwareId = UserAcc.Hardwer;
               Banned.Social = UserAcc.Social_Club;
            }
            await Banned.save();
         } 
      }
      else {
         let Online = mp.players.find(target);
         if (Online) {
            const ActiveChar = await Character.findOne({ where: { id: Online.character } });

            Ban.create({ Account: ActiveChar.id, Character: ActiveChar.id, IP: ActiveChar.ip, Hardwer: ActiveChar.Hardwer, Social: ActiveChar.Social_Club, Date: date, Expiring: expiring, Issuer: player.account });
            Online.kick(reason);
         } else {
            const OfflineChar = await Character.findOne({ where: { Name: target } });

            if (OfflineChar) {
               Ban.create({ Account: OfflineChar.id, Character: OfflineChar.id, IP: OfflineChar.ip, Hardwer: OfflineChar.Hardwer, Social: OfflineChar.Social_Club, Date: date, Expiring: expiring, Issuer: player.account });
            } else {
               // That user is not found
            }
         }
      }
      

      
   };
}


(async () => {

   Ban.sync();

})();