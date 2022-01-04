import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull, ForeignKey } from 'sequelize-typescript';


@Table
export default class Contact extends Model {
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
   Name: string;

   @Column
   @UpdatedAt
   Created_At: Date;

   @Column
   @UpdatedAt
   Updated_At: Date;

   static async New(PhoneNumber: number, TargetName: string) {
      const NewContact = await Contact.create({ Number: PhoneNumber, Name: TargetName });
   }

   static async Exists(PhoneNumber: number, TargetName: string) {
      const Exist = await Contact.findOne({ where: { Number: PhoneNumber, Name: TargetName } });
      if (Exist)
         return true;
      else
         return false;
   }

   async Update(NewNumber: number, NewName: string) {
      this.Number = NewNumber;
      this.Name = NewName;
      await this.save();
   }

}

(async () => {
   await Contact.sync();
})();






