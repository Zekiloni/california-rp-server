

import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { Messages } from '../Globals/Messages';

const Salt = bcrypt.genSaltSync(10);

@Table
class Account extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   id: number

   @Column
   @Unique(true)
   Username: string

   @Column
   @Unique(true)
   Email: string

   @Column
   Password: string

   @Column
   @Default(0)
   Administrator: number

   @Column
   @Default(null)
   Login_Date: Date

   @Column
   @Default(null)
   IP_Adress: string

   @Column
   @Default(null)
   Social_Club: string
   
   @Column
   @Default(null)
   Hardwer: string

   @Column
   @Default(0)
   Warns: number

   @Column
   @Default(0)
   Donator: number

   @Column
   @Default(0)
   Coins: number

   @Column
   @Default(false)
   Online: boolean

   @Column
   @Default(null)
   Last_Character: number

   @Column
   @CreatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   @BeforeCreate
   static Creating (Account: Account) { 
      Account.Password = bcrypt.hashSync(Account.Password, Salt);
   }
   
   Login (Password: string) {     
      return bcrypt.compareSync(Password, this.Password);
   }

   async Logged (Player: PlayerMp, Toggle: boolean, Character: any) {
      this.Online = Toggle;
      this.Last_Character = Character;
      this.Login_Date = new Date();
      this.IP_Adress = Player.ip;
      
      Player.setVariable('Logged', true);

      if (this.Hardwer == null || this.Social_Club == null) {
         const Already = await Account.findOne({ where: { Social_Club: Player.socialClub, Hardwer: Player.serial } });
         if (Already) Player.kick(Messages.USER_ALREADY_EXIST);
         this.Hardwer = Player.serial;
         this.Social_Club = Player.socialClub;
      }
      
   }

   MakeAdministrator (Player: PlayerMp, Level: number) {
      this.Administrator = Level;
      Player.setVariable('Admin', Level); 
      this.save();
   }
}


(async () => { 

   Account.sync();
   
})();