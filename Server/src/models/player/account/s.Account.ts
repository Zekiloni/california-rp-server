

import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, HasMany, DataType, Length, AfterSync } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { shared_Data } from '@shared';
import { rank } from '@enums';
import { Lang, none } from '@constants';
import { Characters, Logs } from '@models';
import { adminAccounts } from '@configs';

const salt = bcrypt.genSaltSync(10);


@Table({
   tableName: 'accounts'
})
export class Accounts extends Model {

   @AutoIncrement
   @PrimaryKey
   @Column
   id: number;
   
   @Unique(true)
   @Column(DataType.STRING(64))
   username: string;

   @Column(DataType.TEXT)
   email: string;

   @HasMany(() => Characters)
   characters: Characters[];

   @Column(DataType.TEXT)
   password: string;

   @Default(rank.NONE)
   @Column(DataType.INTEGER)
   administrator: number;

   @Default(null)
   @Column({
      type: DataType.INTEGER, field: 'last_login'
   })
   lastLogin: Date;

   @Default(null)
   @Column(DataType.STRING(64))
   ip: string;

   @Default(null)
   @Column(DataType.STRING(64))
   social_club: string;
  
   @Default(null)
   @Column(DataType.STRING(256))
   hardwer: string;

   @Default(none)
   @Length( { min: 0, max: 3 } )
   @Column(DataType.INTEGER)
   warns: number;

   @Default(none)
   @Length( { min: 0, max: 3 } )
   @Column(DataType.INTEGER)
   donator: number;

   @Default(none)
   @Column(DataType.INTEGER)
   coins: number;

   @Default(false)
   @Column(DataType.BOOLEAN)
   online: boolean;

   @Default(none)
   @Column({
      type: DataType.INTEGER, field: 'last_character'
   })
   lastCharacter: number;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   get isPlaying () {
      return mp.players.toArray().find(player => player.account && player.account.id == this.id) ? true : false;
   }

   @AfterSync
   static async loading () {
      for (const admin of adminAccounts) { 
         const exist = await Accounts.findOne({ where: { username: admin.username } });
         if (exist == null) { 
            Accounts.create({ username: admin.username, password: admin.password, administrator: admin.admin });
         }
      }

      Logs.info(await Accounts.count() + ' accounts loaded !');
   }

   @BeforeCreate
   static creating (account: Accounts) { 
      account.password = bcrypt.hashSync(account.password, salt);
   }

   login (password: string) {     
      return bcrypt.compareSync(password, this.password);
   }

   async setLogged (player: PlayerMp, toggle: boolean) {
      this.online = toggle;

      player.account = this;
      
      this.lastLogin = new Date();
      this.ip = player.ip;

      player.setVariable(shared_Data.LOGGED, true);
      player.setVariable(shared_Data.ADMIN, this.administrator);

      if (this.hardwer == null || this.social_club == null) {
         Accounts.findOne({ where: { social_club: player.socialClub, hardwer: player.serial } }).then(account => {
            if (account) {
               player.kick(Lang.userAlreadyExist);
            }
         });

         this.hardwer = player.serial;
         this.social_club = player.socialClub;
      }

      await this.save();
   }
   
   setAdministrator (player: PlayerMp, level: number) {
      this.administrator = level;
      player.setVariable(shared_Data.ADMIN, level); 
      this.save();
   }
}


