

import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, HasMany, DataType, Length } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';
import { shared_Data } from '@shared';
import { rank } from '@enums';
import { lang, none } from '@constants';
import { characters } from '@models';


const salt = bcrypt.genSaltSync(10);


@Table
export class accounts extends Model {

   @AutoIncrement
   @PrimaryKey
   @Column
   id: number;
   
   @Unique(true)
   @Column(DataType.STRING(64))
   username: string;

   @Column(DataType.TEXT)
   email: string;

   @HasMany(() => characters)
   characters: characters[];

   @Column(DataType.TEXT)
   password: string;

   @Default(rank.NONE)
   @Column(DataType.INTEGER)
   administrator: number;

   @Default(null)
   @Column
   login_date: Date;

   @Default(null)
   @Column(DataType.STRING(64))
   ip_adress: string;

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
   @Column(DataType.INTEGER)
   last_character: number;

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;


   @BeforeCreate
   static creating (account: accounts) { 
      account.password = bcrypt.hashSync(account.password, salt);
   }

   
   login (password: string) {     
      return bcrypt.compareSync(password, this.password);
   }

   async setLogged (player: PlayerMp, toggle: boolean) {
      this.online = toggle;

      player.account = this;
      
      this.login_date = new Date();
      this.ip_adress = player.ip;

      player.setVariable(shared_Data.LOGGED, true);
      player.setVariable(shared_Data.ADMIN, this.administrator);

      if (this.hardwer == null || this.social_club == null) {

         accounts.findOne({ where: { social_club: player.socialClub, hardwer: player.serial } }).then(account => {
            if (account) {
               player.kick(lang.userAlreadyExist);
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


