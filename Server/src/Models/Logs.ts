import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt } from 'sequelize-typescript';

const Types = {
    0: 'SERVER',
    1: 'PLAYER',
    2: 'ADMIN',
    3: 'MONEY',
    4: 'SELL',
    5: 'GIVE'
};

@Table
export default class Logs extends Model {

   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number

   @Column
   @Default('')
   Type: string

   @Column
   Account: number

   @Column
   Character: number

   @Column
   Participant: number

   @Column
   @Default('')
   Message: number

   @Column
   @UpdatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   static async New (accountId: number, characterId: number, participant: number, message: string) {
      Logs.create({ Account: accountId, Character: characterId, Participant: participant, Message: message });
   }

}


(async () => {

   Logs.sync();

})();
