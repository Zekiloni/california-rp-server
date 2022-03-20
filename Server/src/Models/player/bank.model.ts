
import { 
   Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt,
   BelongsTo, ForeignKey, DataType, Unique, Default,
   HasMany, AfterSync, AutoIncrement 
} from 'sequelize-typescript';
import { characters } from '@models';
import { gDimension, lang, none } from '@constants';
import { business, transactions, TransactionType } from '@models';
import { bankConfig } from '@configs';
import { notifications } from '@enums';


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

   @ForeignKey(() => characters)
   @Column
   owner: number

   @BelongsTo(() => characters)
   character: characters

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
         mp.blips.new(bankConfig.sprite, position, { 
            shortRange: true, 
            dimension: gDimension,
            scale: 1, 
            alpha: 255, 
            name: lang.bank,
            color: bankConfig.spriteColor
         })
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


mp.events.addProc('SERVER::BANK:DEPOSIT', banks.deposit);
mp.events.addProc('SERVER::BANK:WITHDRAW', banks.withdraw);
mp.events.addProc('SERVER::BANK:TRANSFER', banks.transfer);

