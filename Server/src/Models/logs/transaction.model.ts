
import { Table, Model, Column,PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo, DataType, AllowNull, CreatedAt } from 'sequelize-typescript';
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
export class transactions extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default(TransactionType.PAYMENT)
   @Column
   type: TransactionType

   // @ForeignKey(() => banks)
   // @Column
   // accountNumber: number

   // @BelongsTo(() => banks)
   // bankAccount: banks

   @AllowNull(false)
   @Column(DataType.STRING)
   info: string

   @Default(none)
   @Column(DataType.INTEGER)
   balance: number

}



