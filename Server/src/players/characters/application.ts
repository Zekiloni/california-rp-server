import { AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Accounts } from 'src/vehicles';
import { CharacterGender } from '@enums';


const enum ApplicationStatus { 
   NONE, DECLINED, ACCEPTED
}

interface AppSituation {
   question: string
   answer: string
}


@Table
export class Applications extends Model {
   @PrimaryKey
   @AutoIncrement
   @Column
   id: number

   @ForeignKey(() => Accounts)
   @Column(DataType.INTEGER)
   accountID: number

   @BelongsTo(() => Accounts)
   account: Accounts

   @Column(DataType.STRING)
   characterName: string

   @Column(DataType.INTEGER)
   characterGender: CharacterGender
   
   @Column(DataType.TEXT)
   characterStory: string
   
   @Column(DataType.JSON)
   get situations () {
      return JSON.parse(this.getDataValue('situations'));
   }
   set situations (value: [AppSituation, AppSituation]) {
      this.setDataValue('situations', JSON.stringify(value));
   }

   @Default(ApplicationStatus.NONE)
   @Column(DataType.INTEGER)
   status: ApplicationStatus

   @Column(DataType.INTEGER)
   handler: string

   @Column
   reply: string
}