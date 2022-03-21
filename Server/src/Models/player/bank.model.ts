
import { 
   Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt,
   BelongsTo, ForeignKey, DataType, Unique, Default,
   HasMany, AfterSync, AutoIncrement 
} from 'sequelize-typescript';
import { Characters, inventories, business, transactions, TransactionType } from '@models';
import { gDimension, lang, none, cmds } from '@constants';
import { bankConfig } from '@configs';
import { notifications } from '@enums';
import { createInfoColshape, formatCommand } from '@shared';


export interface BankCredit {
   amount: number
   interest: number
   returned: number
   issued: number
   deadline: number
}


@Table
export class banks extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @Unique(true)
   @Column({ type: DataType.TEXT, field: 'bank_account_number' })
   number: string

   @ForeignKey(() => Characters)
   @Column
   owner: number

   @BelongsTo(() => Characters)
   character: Characters

   @Default(none)
   @Column(DataType.INTEGER)
   balance: number;

   @Default(none)
   @Column(DataType.INTEGER)
   savings: number;

   @Default(none)
   @Column(DataType.INTEGER)
   paycheck: number;

   @Column(DataType.STRING)
   get credit (): BankCredit {
      return JSON.parse(this.getDataValue('credit'))
   }

   set credit (value: BankCredit) {
      this.setDataValue('credit', JSON.stringify(value))
   }

   @HasMany(() => transactions)
   transactions: transactions[]

   @Default(true)
   @Column
   active: boolean

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;

   @AfterSync
   static createBanks () {
      for (const position of bankConfig.positions) {
         const [colshape, marker, blip ] = createInfoColshape(position, lang.bank, formatCommand(cmds.names.BANK), 2, gDimension, bankConfig.marker, 1, bankConfig.markerColor, bankConfig.sprite, bankConfig.spriteColor)

         if (blip) {
            blip.shortRange = true;
         }
      }
   }

   static isNear (player: PlayerMp) {
      for (const position of bankConfig.positions) {
         if (player.dist(position) < 2.5) {
            return true;
         }
      }
   }

   menu (player: PlayerMp) {
      player.call(
         'CLIENT::BANKING:MENU', [player.character]
      );
   }

   static getCreditCard (player: PlayerMp) {
      inventories.findOne
   }

   static async withdraw (player: PlayerMp, amount: number) {
      if (!player.character.bank) {
         return;
      }

      if (amount < 1) {
         return;
      }
      
      if (amount > player.character.bank.balance) {
         player.notification('nemres to malo para', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      player.character.giveMoney(player, amount);
      player.character.bank.balance -= amount;
      await player.character.bank.save();

      return true;
   }

   static async deposit (player: PlayerMp, amount: number) {
      if (!player.character.bank) {
         return;
      }

      if (amount < 1) {
         return;
      }

      if (amount > player.character.money) {
         player.notification('nemres to malo para', notifications.type.ERROR, notifications.time.MED);
         return;
      }

      player.character.giveMoney(player, -amount);
      player.character.bank.balance += amount;
      await player.character.bank.save();

      transactions.log(player, player.name + ' deposit ' + amount, TransactionType.DEPOSIT);

      return true;
   }

   static transfer (player: PlayerMp, targetNumber: number, amount: number) {
      banks.findOne( { where: { number: targetNumber } } ).then(target => {
         if (!target) {
            player.notification(lang.BANK_ACCOUNT_NOT_FOUND, notifications.type.ERROR, notifications.time.MED)
            return;
         }

         if (player.character.bank.balance < amount) {
            player.notification(lang.NOT_ENOUGHT_BALANCE, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         if (!target.active) {
            player.notification(lang.BANK_ACCOUNT_NOT_ACTIVE, notifications.type.ERROR, notifications.time.MED);
            return;
         }

         player.character.bank.decrement('balance', { by: amount } );
         target.increment('balance', { by: amount } );

         player.notification(lang.TRANSACTION_SUCCESS_COMPLETED, notifications.type.SUCCESS, notifications.time.MED);

         const targetPlayer = mp.players.toArray().find(_player => _player.character.bank.number == target.number);

         if (targetPlayer) {
            targetPlayer.notification('money', 1, 3);
         }

         return true;
      });
   }


   pay (player: PlayerMp, busines: business, amount: number) {
      if (!busines) {
         return;
      }

      if (this.balance < amount) {
         return;
      }

      return true;
   }
}


mp.events.add('SERVER::BANK:GET_CREDIT_CARD', banks.getCreditCard);
mp.events.addProc('SERVER::BANK:DEPOSIT', banks.deposit);
mp.events.addProc('SERVER::BANK:WITHDRAW', banks.withdraw);
mp.events.addProc('SERVER::BANK:TRANSFER', banks.transfer);

