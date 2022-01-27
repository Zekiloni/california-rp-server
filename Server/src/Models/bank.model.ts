import { Table, Column, Model, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, IsUUID, DataType, Unique, Default } from 'sequelize-typescript';
import { BankCredit } from '../globals/interfaces';
import Characters from './character.model';


@Table
export default class Banks extends Model {

   @Unique(true)
   @PrimaryKey
   @Default(Math.floor(Math.random() * 100000000000000000))
   @Column
   number: bigint;

   @ForeignKey(() => Characters)
   @Column
   character_id: number;

   @BelongsTo(() => Characters)
   character: Characters

   @Default(0)
   @Column
   balance: number;

   @Default(0)
   @Column
   savings: number;

   @Default(0)
   @Column
   paycheck: number;

   @Default(null)
   @Column({
      type: DataType.JSON,
      get () { return JSON.parse(this.getDataValue('credit')); },
   })
   credit: BankCredit

   @Default(true)
   @Column
   active: boolean

   @CreatedAt
   created_At: Date;

   @UpdatedAt
   updated_At: Date;
   
}

