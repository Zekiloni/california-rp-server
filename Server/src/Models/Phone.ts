import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, Unique, Default, BeforeCreate, CreatedAt, UpdatedAt, AllowNull } from 'sequelize-typescript';

const { DataTypes } = require('sequelize');

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
   Contacts: any; // Array<ContactModela> ?

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

class Messages {

}


frp.Messages = frp.Database.define('message', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Phone: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Target: { type: DataTypes.INTEGER, allowNull: false },
      Message: { type: DataTypes.STRING, allowNull: false },
      Readed: { type: DataTypes.BOOLEAN, defaultValue: false }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: false
   }
);
/*
frp.Contacts = frp.Database.define('contact', {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      Phone: { type: DataTypes.INTEGER, unique: true, allowNull: false },
      Name: { type: DataTypes.STRING, allowNull: false },
      Number: { type: DataTypes.INTEGER, allowNull: false }
   }, {
      timestamps: true,
      underscrored: true,
      createdAt: 'Created_Date',
      updatedAt: false
   }
);
*/

frp.Messages.Send = function (phone, target, message) { 
   frp.Messages.new({ Phone: phone, Target: target, message: message });
};


frp.Contacts.Create = function (phone, name, number) { 
   frp.Contacts.new({ Phone: phone, Name: name, Number: number });
};


frp.Messages.prototype.Readed = function () { 
   this.Readed = true;
   await this.save();
};


frp.Contacts.prototype.Update = function (name, number) {
   this.Name = name;
   this.Number = number;
   await this.save();
};


(async () => {
   frp.Messages.sync();
   frp.Contacts.sync();
})();
