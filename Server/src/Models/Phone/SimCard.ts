import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey } from 'sequelize-typescript';


@Table
export default class SimCard extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   ID: number;

   @Column
   @Unique(true)
   @AllowNull(false)
   Number: number;

   @Column
   @AllowNull(false)
   @Default([])
   Contacts: any; // Array<Contact> ?

   @Column
   @AllowNull(false)
   @Default(0) // Mozda staviti da imaju default neki kredit?
   Money: number;

   @Column
   @AllowNull(false)
   PIN: string;

   static async New() {
      let NewNumber = SimCard.GenerateNumber(100000, 999999);
      do { NewNumber = SimCard.GenerateNumber(100000, 999999); } while (SimCard.Exists(NewNumber));
      const NewSim = await SimCard.create({ Number: NewNumber, PIN: SimCard.GenerateNumber(1000, 9999) });
   }

   static async Exists(PhoneNumber: number) {
      const Exist = await SimCard.findOne({ where: { Number: PhoneNumber} });
      if (Exist)
         return true;
      else
         return false;
   }

   static GenerateNumber(min: number, max: number) { // Phone min: 100000 - max: 999999 | Pin min: 1000 - max 9999
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
   
}

(async () => {
    await SimCard.sync();
 })();