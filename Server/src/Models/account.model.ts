

import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import Characters from './character.model';
import { entityData } from '../globals/enums';
import { Messages } from '../globals/constants';

const salt = bcrypt.genSaltSync(10);

@Table
export default class Accounts extends Model {

   @AutoIncrement
   @PrimaryKey
   @Column
   id: number

   @Unique(true)
   @Column
   username: string

   @Unique(true)
   @Column
   email: string

   @Column
   password: string

   @Default(0)
   @Column
   administrator: number

   @Default(null)
   @Column
   login_date: Date

   @Default(null)
   @Column
   ip_adress: string

   @Default(null)
   @Column
   social_club: string
   
   @Default(null)
   @Column
   hardwer: string

   @Default(0)
   @Column
   warns: number

   @Default(0)
   @Column
   donator: number

   @Default(0)
   @Column
   coins: number

   @Default(false)
   @Column
   online: boolean

   @Default(0)
   @Column
   last_character: number

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   @BeforeCreate
   static creating (account: Accounts) { 
      account.password = bcrypt.hashSync(account.password, salt);
   }

   @HasMany(() => Characters)
   characters: Characters[]
   
   Login (Password: string) {     
      return bcrypt.compareSync(Password, this.password);
   }

   async Logged (player: PlayerMp, toggle: boolean) {
      this.online = toggle;
      player.Account = this;
      this.login_date = new Date();
      this.ip_adress = player.ip;
      
      player.setVariable(entityData.LOGGED, true);
      player.setVariable(entityData.ADMIN, this.administrator);

      if (this.hardwer == null || this.social_club == null) {
         const Already = await Accounts.findOne({ where: { social_club: player.socialClub, hardwer: player.serial } });
         if (Already) player.kick(Messages.USER_ALREADY_EXIST);
         this.hardwer = player.serial;
         this.social_club = player.socialClub;
      }

      await this.save();
   }

   
   setAdministrator (player: PlayerMp, level: number) {
      this.administrator = level;
      player.setVariable(entityData.ADMIN, level); 
      this.save();
   }
}


