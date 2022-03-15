import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, DataType, Unique, Default } from 'sequelize-typescript';
import { characters } from '@models';
import { none } from '@constants';
import { business } from '@models';


export interface BankCredit {
   amount: number
   interest: number
   returned: number
   issued: number
   deadline: number
}


@Table
export class banks extends Model {
   @Unique(true)
   @PrimaryKey
   @Column
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

   @Default(true)
   @Column
   active: boolean

   @CreatedAt
   created_at: Date;

   @UpdatedAt
   updated_at: Date;


   withdraw (player: PlayerMp, amount: number) {

   }

   deposit (player: PlayerMp, amount: number) {

   }

   transfer (player: PlayerMp, targetNumber: number, amount: number) {
      banks.findOne( { where: { id: targetNumber } } ).then(target => {
         if (!target) {
            return;
         }

         if (this.balance < amount) {
            return;
         }

         this.decrement('balance', { by: amount } );
         target.increment('balance', { by: amount } );

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

