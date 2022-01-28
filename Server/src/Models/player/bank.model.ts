import { Table, Column, Model, PrimaryKey, CreatedAt, UpdatedAt, BelongsTo, ForeignKey, DataType, Unique, Default } from 'sequelize-typescript';
import { bankCredit } from '@interfaces';
import { characters } from '@models';


@Table
export class banks extends Model {
   @Unique(true)
   @PrimaryKey
   @Column
   number: string

   @ForeignKey(() => characters)
   @Column
   character_id: number

   @BelongsTo(() => characters)
   character: characters

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
   @Column(
      {
         type: DataType.JSON,
         get () { 
            return JSON.parse(this.getDataValue('credit')); 
         }
      }
   )
   credit: bankCredit

   @Default(true)
   @Column
   active: boolean

   @CreatedAt
   created_At: Date;

   @UpdatedAt
   updated_At: Date;
}

