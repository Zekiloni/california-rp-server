import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, UpdatedAt, AllowNull } from 'sequelize-typescript';


@Table
export default class Contacts extends Model {
   @Column
   @PrimaryKey
   @AutoIncrement
   id: number;

   @Column
   @Unique(true)
   @AllowNull(false)
   Phone: number;

   @Column
   @AllowNull(false)
   Contact_Name: string;

   @Column
   @AllowNull(false)
   Contact_Phone: number;

   @Column
   @UpdatedAt
   Created_at: Date;

   @Column
   @UpdatedAt
   Updated_at: Date;

   static async new (phone: number, cPhone: number, cName: string) {
      const newContact = await Contacts.create({ Phone: phone, Contact_Phone: cPhone, Contact_Name: cName });
   }

   static async doesExist (phoneNum: number, contact: string) {
      const exist = await Contacts.findOne({ where: { Contact_Phone: phoneNum, Contact_Name: contact } });
      return exist ? true : false;
   }

   async edit (newNumber: number, newName: string) {
      this.Contact_Phone = newNumber;
      this.Contact_Name = newName;
      await this.save();
   }

}

(async () => {
   await Contacts.sync();
})();






