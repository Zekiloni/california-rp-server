import { AfterCreate, AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';


@Table({ 
   updatedAt: false, createdAt: false 
})
export class killLogs extends Model {
   @Column({ 
      type: DataType.INTEGER, field: 'killed_character_id'
   })
   character: number

   @AllowNull(true)
   @Column({
      type: DataType.INTEGER, field: 'killer_character_id'
   })
   killerCharacter: number | null
   
   @Column(DataType.INTEGER)
   reason: number

   @Column
   date: number
   

   @AfterCreate
   static afterCreateKillLog (moneyLog: killLogs) {
      // push to discord
   }
}