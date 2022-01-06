

import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import Characters from './character.model';
import { EntityData } from '../enums';
import { Messages } from '../constants';

const Salt = bcrypt.genSaltSync(10);

@Table
export default class Accounts extends Model {
   @AutoIncrement
   @PrimaryKey
   @Column
   id: number

   @Unique(true)
   @Column
   Username: string

   @Unique(true)
   @Column
   Email: string

   @Column
   Password: string

   @Default(0)
   @Column
   Administrator: number

   @Default(null)
   @Column
   Login_Date: Date

   @Default(null)
   @Column
   IP_Adress: string

   @Default(null)
   @Column
   Social_Club: string
   
   @Default(null)
   @Column
   Hardwer: string

   @Default(0)
   @Column
   Warns: number

   @Default(0)
   @Column
   Donator: number

   @Default(0)
   @Column
   Coins: number

   @Default(false)
   @Column
   Online: boolean

   @Default(-1)
   @Column
   Last_Character: number

   @CreatedAt
   Created_At: Date;

   @UpdatedAt
   Updated_At: Date;

   @BeforeCreate
   static Creating (Account: Accounts) { 
      Account.Password = bcrypt.hashSync(Account.Password, Salt);
   }

   @HasMany(() => Characters)
   Characters: Characters[]
   
   Login (Password: string) {     
      return bcrypt.compareSync(Password, this.Password);
   }

   async Logged (player: PlayerMp, toggle: boolean) {
      this.Online = toggle;
      player.Account = this;
      this.Login_Date = new Date();
      this.IP_Adress = player.ip;
      
      player.setVariable(EntityData.LOGGED, true);
      player.setVariable(EntityData.ADMIN, this.Administrator);

      if (this.Hardwer == null || this.Social_Club == null) {
         const Already = await Accounts.findOne({ where: { Social_Club: player.socialClub, Hardwer: player.serial } });
         if (Already) player.kick(Messages.USER_ALREADY_EXIST);
         this.Hardwer = player.serial;
         this.Social_Club = player.socialClub;
      }

      await this.save();
   }

   
   setAdministrator (player: PlayerMp, level: number) {
      this.Administrator = level;
      player.setVariable(EntityData.ADMIN, level); 
      this.save();
   }
}


