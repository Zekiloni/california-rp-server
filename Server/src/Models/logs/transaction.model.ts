
import { Table, Model, Column,PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import { banks } from '@models';
import { none } from '@constants';


const enum TransactionType {
   PAYMENT, 
   TRANSFER, 
   WITHDRAW, 
   DEPOSIT, 
   PAYCHECK
}


@Table
export default class transactions extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default(TransactionType.PAYMENT)
   @Column
   type: TransactionType
   
   @ForeignKey(() => banks)
   @Column
   account_number: number

   @BelongsTo(() => banks)
   bank_account: banks

   @AllowNull(false)
   @Column(DataType.STRING)
   info: string

   @Default(none)
   @Column(DataType.INTEGER)
   balance: number
}



