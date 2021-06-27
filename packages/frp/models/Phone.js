
const { DataTypes } = require('sequelize');

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
