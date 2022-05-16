
import { Table, Model, Column, PrimaryKey, AutoIncrement, Default, ForeignKey, BelongsTo, DataType, AllowNull } from 'sequelize-typescript';
import rp from 'request-promise';

import { Logs, banks } from '@models';
import { cmds, colors, none } from '@constants';
import { formatCommand } from '@shared';
import { ServerConfig } from '@configs';


export const enum TransactionType {
   PAYMENT, 
   TRANSFER, 
   WITHDRAW, 
   DEPOSIT, 
   PAYCHECK
}


@Table({
   createdAt: false, updatedAt: false
})
export class transactions extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Default(TransactionType.PAYMENT)
   @Column(DataType.INTEGER)
   type: TransactionType

   @ForeignKey(() => banks)
   @Column(DataType.INTEGER)
   bank_account_id: number

   @BelongsTo(() => banks)
   bank_account: banks

   @AllowNull(false)
   @Column(DataType.STRING)
   info: string

   @Default(none)
   @Column(DataType.INTEGER)
   balance: number

   @Default(Date.now)
   @Column(DataType.INTEGER)
   date: number
   
   static log (player: PlayerMp, message: string, type: TransactionType) {
      transactions.create({
         type: type,
         bank_account_id: player.character.bank.id,
         bank_Account: player.character.bank,
         info: message,
         balance: player.character.bank.balance,
         date: Date.now()
      });

      const embed = {
         title: formatCommand(cmds.names.BANK),
         description: message,
         color: parseInt(colors.hex.BROADCAST, 16)
      };

      const params = {
         username: ServerConfig.name,
         embeds: [embed]
      };

      const options = {
         method: 'POST',
         uri: ServerConfig.discord.transactionHook,
         body: params,
         json: true
      };

      rp(options)
         .catch(e => Logs.error('discordTransactionHook: ' + e) );
   }
}



